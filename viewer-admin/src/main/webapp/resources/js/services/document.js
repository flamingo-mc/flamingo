/*
 * Copyright (C) 2012-2016 B3Partners B.V.
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

Ext.define('vieweradmin.components.Document', {

    extend: "Ext.ux.b3p.CrudGrid",

    config: {
        gridurl: "",
        editurl: "",
        deleteurl: "",
        itemname: i18next.t('viewer_admin_document_gtitle')
    },

    constructor: function(config) {
        this.initConfig(config);
        vieweradmin.components.Document.superclass.constructor.call(this, this.config);
        vieweradmin.components.Menu.setActiveLink('menu_documenten');
    },

    getGridColumns: function() {
        return [
            {
                id: 'name',
                text: i18next.t('viewer_admin_document_0'),
                dataIndex: 'name',
                flex: 1,
                filter: {
                    xtype: 'textfield'
                }
            },{
                id: 'category',
                text: i18next.t('viewer_admin_document_1'),
                dataIndex: 'category',
                flex: 1,
                filter: {
                    xtype: 'textfield'
                }
            },{
                id: 'url',
                text: i18next.t('viewer_admin_document_2'),
                dataIndex: 'url',
                flex: 1,
                filter: {
                    xtype: 'textfield'
                }
            },{
                id: 'edit',
                header: '',
                dataIndex: 'id',
                width: 200,
                sortable: false,
                hideable: false,
                menuDisabled: true,
                renderer: function(value) {
                    return [
                        Ext.String.format('<a href="#" class="editobject">' + i18next.t('viewer_admin_document_3') + '</a>'),
                        Ext.String.format('<a href="#" class="removeobject">' + i18next.t('viewer_admin_document_4') + '</a>')
                    ].join(" | ");
                }
            }
        ];
    },

    getGridModel: function() {
        return [
            {name: 'id', type: 'int' },
            {name: 'name', type: 'string'},
            {name: 'category', type: 'string'},
            {name: 'url', type: 'string'}
        ];
    },

    removeConfirmMessage: function(record) {
        return i18next.t('viewer_admin_document_5', {name: record.get("name")});
    },

    getEditUrl: function(record) {
        return this.createUrl(this.config.editurl, { document: record.get('id') });
    },

    getRemoveUrl: function(record) {
        return this.createUrl(this.config.deleteurl, { document: record.get('id') });
    }

});