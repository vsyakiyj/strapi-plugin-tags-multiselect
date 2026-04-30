'use strict';

module.exports = ({ strapi }) => {
  console.log('MULTISELECT: custom field register loaded');

  strapi.customFields.register({
    name: 'multiselect',
    plugin: 'multiselect-field',
    type: 'string',
  });
};