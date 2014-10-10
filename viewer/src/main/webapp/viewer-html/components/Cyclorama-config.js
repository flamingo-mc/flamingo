/*
 * Copyright (C) 2012-2013 B3Partners B.V.
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
Ext.define("viewer.components.CustomConfiguration",{
    extend: "viewer.components.SelectionWindowConfig",
    form: null,
    constructor: function (parentid,config){
          if(config === undefined || config === null){
            config = new Object();
        }
        config.showLabelconfig =true;
        viewer.components.CustomConfiguration.superclass.constructor.call(this, parentid,config);

        var me=this;
        this.form.add([
            {
                xtype: "combo",
                id: "layerCombo",
                fieldLabel: "Laag",
                labelWidth:this.labelWidth,
                store: this.createLayerStore(),
                queryMode: "local",
                displayField: "alias",
                editable: false,
                valueField: "id",
                name: "layers",
                value: config.layers,
                listeners: {
                    change: function (combo, id) {
                        if (id === null) {
                            return;
                        }
                        var layerId = id;

                        var appLayer = appConfig.appLayers[layerId];

                        var ac1 = Ext.getCmp("attributeCombo1");
                        ac1.clearValue();
                        var photoIdAttribute = ac1.getStore();

                        photoIdAttribute.removeAll();

                        var ac2 = Ext.getCmp("attributeCombo2");
                        ac2.clearValue();
                        var photoDescriptionAttribute = ac2.getStore();

                        photoDescriptionAttribute .removeAll();

                        if (!appLayer) {
                            return;
                        }

                        Ext.Array.each(appLayer.attributes, function (att) {
                            photoIdAttribute.add({
                                name: att.name,
                                alias: att.alias || att.name,
                                type: att.type
                            });

                            photoDescriptionAttribute.add({
                                name: att.name,
                                alias: att.alias || att.name,
                                type: att.type
                            });
                        });

                    }
                }
            }, {
                xtype: "combo",
                id: "attributeCombo1",
                fieldLabel: "Foto id attribuut",
                store: Ext.create("Ext.data.Store", {
                    fields: ["name", "alias", "type"]
                }),
                queryMode: "local",
                displayField: "alias",
                editable: false,
                name: "imageIdAttribute",
                value: config.imageIdAttribute,
                valueField: "name",
                labelWidth:this.labelWidth,
                listeners: {
                    select: function (combo, records, eOpts) {
                        Ext.getCmp("attributeInfo").setValue("Type: " + records[0].get("type"));
                    }
                }
            }, {
                xtype: "combo",
                id: "attributeCombo2",
                fieldLabel: "Foto beschrijving attribuut",
                store: Ext.create("Ext.data.Store", {
                    fields: ["name", "alias", "type"]
                }),
                queryMode: "local",
                displayField: "alias",
                editable: false,
                name: "imageDescriptionAttribute",
                value: config.imageDescriptionAttribute,
                valueField: "name",
                labelWidth:this.labelWidth,
                listeners: {
                    select: function (combo, records, eOpts) {
                        Ext.getCmp("attributeInfo").setValue("Type: " + records[0].get("type"));
                    }
                }
            }
        ]);


    },
    createLayerStore: function() {
        var store = Ext.create("Ext.data.Store", {
            fields: ["id", "serviceId", "layerName", "alias"]
        });

        Ext.Object.each(appConfig.appLayers, function(id, appLayer) {
            if(appLayer.attributes.length > 0) {
                store.add({id: id, serviceId: appLayer.serviceId, layerName: appLayer.layerName, alias: appLayer.alias});
            }
        });
        return store;
    },
});
