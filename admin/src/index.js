import pluginId from './pluginId.js';
import PluginIcon from './components/PluginIcon.jsx';

export default {
  register(app) {
    app.customFields.register({
      name: 'multiselect',
      pluginId,
      type: 'string',

      intlLabel: {
        id: `${pluginId}.multiselect.label`,
        defaultMessage: 'Multiselect tags',
      },

      intlDescription: {
        id: `${pluginId}.multiselect.description`,
        defaultMessage: 'Select multiple values and show them as tags',
      },

      icon: PluginIcon,

      components: {
        Input: async () =>
          import('./components/MultiselectInput.jsx').then((module) => ({
            default: module.default,
          })),
      },

      options: {
        base: [
          {
            sectionTitle: {
              id: `${pluginId}.multiselect.options`,
              defaultMessage: 'Multiselect options',
            },
            items: [
              {
                name: 'options.options',
                type: 'textarea',
                intlLabel: {
                  id: `${pluginId}.multiselect.options.options.label`,
                  defaultMessage: 'Available options',
                },
                description: {
                  id: `${pluginId}.multiselect.options.options.description`,
                  defaultMessage:
                    'One option per line: value|Label|Tab. Example: new|Новинки|Статус',
                },
              },
              {
                name: 'options.delimiter',
                type: 'text',
                intlLabel: {
                  id: `${pluginId}.multiselect.options.delimiter.label`,
                  defaultMessage: 'Delimiter',
                },
                description: {
                  id: `${pluginId}.multiselect.options.delimiter.description`,
                  defaultMessage: 'Default: comma',
                },
                defaultValue: ',',
              },
            ],
          },
        ],
      },
    });
  },

  bootstrap() {},
};