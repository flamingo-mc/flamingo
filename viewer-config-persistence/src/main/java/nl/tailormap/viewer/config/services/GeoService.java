/*
 * Copyright (C) 2011-2017 B3Partners B.V.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package nl.tailormap.viewer.config.services;

import nl.tailormap.viewer.config.ClobElement;
import nl.tailormap.viewer.config.security.Authorizations;
import nl.tailormap.viewer.config.security.Authorizations.ReadWrite;
import nl.tailormap.viewer.util.DB;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.mutable.MutableObject;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorValue;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.NoResultException;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.OrderColumn;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.Transient;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 *
 * @author Matthijs Laan
 */
@Entity
@DiscriminatorColumn(name="protocol")
public abstract class GeoService implements Serializable {
    public static final String PARAM_ONLINE_CHECK_ONLY = "onlineCheckOnly";
    public static final String PARAM_MUST_LOGIN = "mustLogin";
    
    public static final String DETAIL_OVERRIDDEN_URL = "overridenUrl";
    public static final String DETAIL_ORIGINAL_NAME = "originalName";
    
    public static final String DETAIL_USE_INTERSECT = "useIntersect";
    public static final String DETAIL_USE_PROXY = "useProxy";

    /** 
    * HTTP Basic authentication username to use with pre-emptive
     * authentication.
     */
    public static final String PARAM_USERNAME = "username";

    /**
     * HTTP Basic authentication password to use with pre-emptive
     * authentication.
     */
    public static final String PARAM_PASSWORD = "password";
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Basic(optional=false)
    private String name;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "category")
    private Category category;

    @Basic(optional=false)
    private String url;

    private String username;
    private String password;
    
    private String geofenceHeader;
    private String version;

    private boolean monitoringEnabled;
    
    private boolean monitoringStatusok = true;

    @OneToOne(cascade=CascadeType.PERSIST)
    @JoinColumn(name = "top_layer")
    private Layer topLayer;

    @ElementCollection
    @CollectionTable(
            joinColumns = @JoinColumn(name = "geo_service")
    )
    @Column(name="keyword")
    private Set<String> keywords = new HashSet<>();
    
    @Transient
    private List<Layer> layers;
    
    @Transient
    private Map<Layer,List<Layer>> childrenByParent = null;
    
    @Basic(optional=false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date authorizationsModified = new Date();

    @ElementCollection    
    @JoinTable(joinColumns=@JoinColumn(name="geoservice"))
    // Element wrapper required because of http://opensource.atlassian.com/projects/hibernate/browse/JPA-11
    private Map<String, ClobElement> details = new HashMap<>();


    @JoinTable(
            name = "geo_service_style_libraries",
            joinColumns = @JoinColumn(name ="geo_service" ),
            inverseJoinColumns=@JoinColumn(name="style_library"))
    @OneToMany(cascade=CascadeType.PERSIST) // Actually @OneToMany, workaround for HHH-1268
    @OrderColumn(name="list_index")
    private List<StyleLibrary> styleLibraries = new ArrayList();
    
    
    @ElementCollection
    @CollectionTable(joinColumns = @JoinColumn(name = "geo_service"))
    @Column(name="role_name")
    private Set<String> readers = new HashSet<String>();
    
    //<editor-fold defaultstate="collapsed" desc="getters en setters">
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Layer getTopLayer() {
        return topLayer;
    }

    public void setTopLayer(Layer topLayer) {
        this.topLayer = topLayer;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Set<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(Set<String> keywords) {
        this.keywords = keywords;
    }

    public boolean isMonitoringEnabled() {
        return monitoringEnabled;
    }

    public void setMonitoringEnabled(boolean monitoringEnabled) {
        this.monitoringEnabled = monitoringEnabled;
    }

    public Date getAuthorizationsModified() {
        return authorizationsModified;
    }

    public void setAuthorizationsModified(Date authorizationsModified) {
        this.authorizationsModified = authorizationsModified;
    }

    public boolean isMonitoringStatusok() {
        return monitoringStatusok;
    }

    public void setMonitoringStatusok(boolean monitoringStatusOK) {
        this.monitoringStatusok = monitoringStatusOK;
    }

    public Map<String, ClobElement> getDetails() {
        return details;
    }

    public void setDetails(Map<String, ClobElement> details) {
        this.details = details;
    }

    public List<StyleLibrary> getStyleLibraries() {
        return styleLibraries;
    }

    public void setStyleLibraries(List<StyleLibrary> styleLibraries) {
        this.styleLibraries = styleLibraries;
    }

    public Set<String> getReaders() {
        return readers;
    }

    public void setReaders(Set<String> readers) {
        this.readers = readers;
    }

    public String getGeofenceHeader() {
        return geofenceHeader;
    }

    public void setGeofenceHeader(String geofenceHeader) {
        this.geofenceHeader = geofenceHeader;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }
    //</editor-fold>
      /*
    @PreRemove
    public void removeAllLayers() {
        EntityManager em = Stripersist.getEntityManager();
        List<Layer> allLayers = em.createQuery("from Layer where service = :this")
                .setParameter("this", this)
                .getResultList();
        
        for(Layer l: allLayers) {
            l.getChildren().clear();
            em.remove(l);
        }
    }
*/

    public String getProtocol() {
        return getClass().getAnnotation(DiscriminatorValue.class).value();
    }


    public void authorizationsModified() {
        authorizationsModified = new Date();
    }    
    
    /** To prevent a lot of SQL requests walking a tree structure of entities,
     * load all layers using an efficient query. The Layers.children collections
     * are not initialized, but can be reconstructed from the list of all Layers
     * for this service returned by the query. Call Layer.getLayerChildrenCache() 
     * to retrieve it without causing a SQL query.
     * 
     * The cache is not updated on changes, so will only represent the database
     * state when loadLayerTree() was last called.
     *
     * @param em the entity manager to use
     * @return the list of layers of this service
     */
    public List<Layer> loadLayerTree(EntityManager em) {
        if(layers != null) {
            return layers;
        }
        
        if(!em.contains(this)) {
            // Not a persistent entity (for example when loading user specified 
            // service)
            return Collections.EMPTY_LIST;
        }
        
        // Retrieve layer tree structure in single query
        layers = em.createNamedQuery("getLayerTree")
            .setParameter("rootId", topLayer.getId())
            .getResultList();   
      
        childrenByParent = new HashMap<Layer,List<Layer>>();
        for(Layer l: layers) {               
            if(l.getParent() != null) {
                List<Layer> parentChildren = childrenByParent.get(l.getParent());
                if(parentChildren == null) {
                    parentChildren = new ArrayList<Layer>();
                    childrenByParent.put(l.getParent(), parentChildren);
                }
                parentChildren.add(l);
            }
        }      
        return layers;
    }
    
    public List<Layer> getLayerChildrenCache(Layer l, EntityManager em) {
        if(childrenByParent != null) {
            
            if(!em.getEntityManagerFactory().getPersistenceUnitUtil().isLoaded(l.getChildren())) {
                List<Layer> childrenList = childrenByParent.get(l);
                if(childrenList == null) {
                    return Collections.EMPTY_LIST;
                } else {
                    return childrenList;
                }
            } else {
                return l.getChildren();
            }
        } else {
            return l.getChildren();
        }
    }
    
    public JSONObject toJSONObject(boolean includeLayerTree, Set<String> layersToInclude,boolean validXmlTags, EntityManager em) throws JSONException {
        return toJSONObject(includeLayerTree, layersToInclude, validXmlTags, false, em);
    }
    
    public JSONObject toJSONObject(boolean includeLayerTree, Set<String> layersToInclude,boolean validXmlTags, boolean includeAuthorizations, EntityManager em) throws JSONException {
        JSONObject o = new JSONObject();
        o.put("id", id);
        o.put("name", name);
        o.put("url", url);
        o.put("protocol", getProtocol());
        o.put("readers",getReaders());
        o.put("version",getVersion());

        if (details.containsKey(GeoService.DETAIL_USE_PROXY)) {
            ClobElement ce = details.get(GeoService.DETAIL_USE_PROXY);
            boolean useProxy = Boolean.parseBoolean(ce.getValue());
            o.put(GeoService.DETAIL_USE_PROXY, useProxy);
            if(getPassword() != null && getUsername() != null){
                o.put(PARAM_MUST_LOGIN, true);
            }
        }else{
            o.put(GeoService.DETAIL_USE_PROXY, false);
        }
        if(this instanceof WMSService){
            WMSExceptionType extype = ((WMSService)this).getException_type() != null ? ((WMSService)this).getException_type() : WMSExceptionType.Inimage;
            o.put("exception_type", extype.getDescription());
        }
        
        if (!validXmlTags){
            JSONObject jStyleLibraries = new JSONObject();
            for(StyleLibrary sld: getStyleLibraries()) {
                JSONObject jsld = new JSONObject();
                String styleName=sld.getId().toString();                
                jStyleLibraries.put("sld:" +styleName ,jsld);
                jsld.put("id", sld.getId());
                jsld.put("title", sld.getTitle());
                jsld.put("default", sld.isDefaultStyle());
                if(sld.isDefaultStyle()) {
                    o.put("defaultStyleLibrary", jsld);
                }
                if(sld.getExternalUrl() != null) {
                    jsld.put("externalUrl", sld.getExternalUrl());
                } 
                JSONObject userStylesPerNamedLayer = new JSONObject();
                if(sld.getNamedLayerUserStylesJson() != null) {
                    userStylesPerNamedLayer = new JSONObject(sld.getNamedLayerUserStylesJson());
                }
                jsld.put("userStylesPerNamedLayer", userStylesPerNamedLayer);
                if(sld.getExtraLegendParameters() != null) {
                    jsld.put("extraLegendParameters", sld.getExtraLegendParameters());
                }
                jsld.put("hasBody", sld.getExternalUrl() == null);
            }
            o.put("styleLibraries", jStyleLibraries);
        }
        
        if(topLayer != null) {
            
            if(em.contains(this)) {
                   
                List<Layer> layerEntities = loadLayerTree(em);

                if(!layerEntities.isEmpty()) {
                    // Prevent n+1 queries
                    int i = 0;
                    do {
                        List<Layer> subList = layerEntities.subList(i, Math.min(layerEntities.size(), i+ DB.MAX_LIST_EXPRESSIONS));
                        em.createQuery("from Layer l "
                                + "left join fetch l.details "
                                + "where l in (:layers)")
                                .setParameter("layers", subList)
                                .getResultList();
                        i += subList.size();
                    } while(i < layerEntities.size());
                }
            }

            JSONObject layers = new JSONObject();
            o.put("layers", layers);
            walkLayerJSONFlatten(topLayer, layers, layersToInclude,validXmlTags, includeAuthorizations, em);
            
            if(includeLayerTree) {
                o.put("topLayer", walkLayerJSONTree(topLayer, em));
            }
            
        }
        return o;
    }
    
    private static void walkLayerJSONFlatten(Layer l, JSONObject layers, Set<String> layersToInclude,boolean validXmlTags, boolean includeAuthorizations, EntityManager em) throws JSONException {

        /* TODO check readers (and include readers in n+1 prevention query */
        
        /* Flatten tree structure, currently depth-first - later traversed layers
        * do not overwrite earlier layers with the same name - do not include
        * virtual layers
        */

        if(layersToInclude == null || layersToInclude.contains(l.getName())) {
            if(!l.isVirtual() && l.getName() != null && !layers.has(l.getName())) {
                String name = l.getName();
                if (validXmlTags){
                    /*name="layer_"+name;
                    name=name.replaceAll(" ", "_");*/
                    name="layer"+layers.length();
                }
                JSONObject layer = l.toJSONObject();
                if(includeAuthorizations){
                    ReadWrite rw = Authorizations.getLayerAuthorizations(l, em);
                    layer.put(Authorizations.AUTHORIZATIONS_KEY, rw != null ? rw.toJSON() : new JSONObject());
                }
                layers.put(name, layer);
            }
        }

        for(Layer child: l.getCachedChildren(em)) {                
            walkLayerJSONFlatten(child, layers, layersToInclude,validXmlTags,includeAuthorizations, em);
        }
    }
    
    private static JSONObject walkLayerJSONTree(Layer l, EntityManager em) throws JSONException {
        JSONObject j = l.toJSONObject();
        
        List<Layer> children = l.getCachedChildren(em);
        if(!children.isEmpty()) {        
            JSONArray jc = new JSONArray();
            j.put("children", jc);
            for(Layer child: children) {                
                jc.put(walkLayerJSONTree(child, em));
            }
        }
        return j;
    }
    
    public JSONObject toJSONObject(boolean includeLayerTree, EntityManager em) throws JSONException {
        return toJSONObject(includeLayerTree, null,false,false,em);
    }
    
    /**
     * Gets a single layer without loading all layers. If multiple layers exist
     * with the same name, a random non-virtual layer is returned.
     *
     * @param layerName the name of the layer to find
     * @param em the EntityManager to use
     * @return the named layer
     */
    public Layer getSingleLayer(final String layerName, EntityManager em) {
        try {
            return (Layer)em.createQuery(
                      "from Layer where service = :service "
                    + "and name = :n order by virtual desc")
                    .setParameter("service", this)
                    .setParameter("n", layerName)
                    .setMaxResults(1)
                    .getSingleResult();

        } catch (NoResultException nre) {
            return null;
        }        
    }

    /**
     * Returns the layer with the given name in this server. The first layer in
     * a depth-first tree traversal with the name is returned. If a child has
     * the same name as its parent, the child is returned.
     *
     * @param layerName the layer name to search for
     * @param em the entity manager to use
     * @return the Layer or null if not found
     */
    public Layer getLayer(final String layerName, EntityManager em) {
        loadLayerTree(em);
        
        if(layerName == null || topLayer == null) {
            return null;
        }
        
        final MutableObject<Layer> layer = new MutableObject(null);
        
        topLayer.accept(new Layer.Visitor() {
            @Override
            public boolean visit(Layer l, EntityManager em) {
                if(StringUtils.equals(l.getName(),layerName)) {
                    layer.setValue(l);
                    return false;
                }
                return true;
            }
        },em);
        
        return layer.getValue();
    }
}