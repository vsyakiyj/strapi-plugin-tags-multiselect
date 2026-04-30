'use strict';

module.exports = ({ strapi }) => {
 
  strapi.customFields.register({
    name: 'multiselect',
    plugin: 'tags-multiselect',
    type: 'string',
  });
};