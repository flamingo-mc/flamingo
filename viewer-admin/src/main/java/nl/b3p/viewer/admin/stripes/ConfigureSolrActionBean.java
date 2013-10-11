/*
 * Copyright (C) 2011-2013 B3Partners B.V.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package nl.b3p.viewer.admin.stripes;

import javax.annotation.security.RolesAllowed;
import net.sourceforge.stripes.action.ActionBean;
import net.sourceforge.stripes.action.ActionBeanContext;
import net.sourceforge.stripes.action.DefaultHandler;
import net.sourceforge.stripes.action.ForwardResolution;
import net.sourceforge.stripes.action.Resolution;
import net.sourceforge.stripes.action.StreamingResolution;
import net.sourceforge.stripes.action.StrictBinding;
import net.sourceforge.stripes.action.UrlBinding;
import nl.b3p.viewer.config.security.Group;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author Meine Toonen
 */

@UrlBinding("/action/configuresolr")
@StrictBinding
@RolesAllowed({Group.ADMIN,Group.REGISTRY_ADMIN})
public class ConfigureSolrActionBean  implements ActionBean{
    
    private static final String JSP = "/WEB-INF/jsp/services/solrconfig.jsp";
    private ActionBeanContext context;
    
     //<editor-fold defaultstate="collapsed" desc="getters & setters">
    @Override
    public ActionBeanContext getContext() {
        return context;
    }

    @Override
    public void setContext(ActionBeanContext context) {
        this.context = context;
    }

    //</editor-fold>
    
    
    @DefaultHandler
    public Resolution view() {
        return new ForwardResolution(JSP);
    }
    
    public Resolution edit() {
        return new ForwardResolution(JSP);
    }
    
    public Resolution delete() {
        return new ForwardResolution(JSP);
    }
    
    public Resolution getGridData() throws JSONException {
        JSONObject json = new JSONObject("{\"totalCount\":3,\"gridrows\":[{\"id\":1, \"lastprocessed\": \"1-2-2012\"},{\"id\":2, \"lastprocessed\": \"1-2-2012\"},{\"id\":3, \"lastprocessed\": \"1-2-2012\"}]}");
        
        return new StreamingResolution("application/json", json.toString(4));
    }

}
