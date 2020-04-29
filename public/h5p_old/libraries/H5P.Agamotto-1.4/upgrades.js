/** @namespace H5PUpgrades */
var H5PUpgrades = H5PUpgrades || {};

H5PUpgrades['H5P.Agamotto'] = (function () {
  return {
    1: {
      3: function (parameters, finished) {
        // Update image items
        if (parameters.items) {
          parameters.items = parameters.items.map( function (item) {
            // Create new image structure
            var newImage = {
              library: 'H5P.Image 1.0',
              // We avoid using H5P.createUUID since this is an upgrade script and H5P function may change
              subContentId: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (char) {
                var random = Math.random() * 16 | 0, newChar = char === 'x' ? random : (random & 0x3 | 0x8);
                return newChar.toString(16);
              }),
              params: {
                alt: item.labelText || '',
                contentName: 'Image',
                title: item.labelText || '',
                file: item.image
              }
            };

            // Compose new item
            item = {
              description: item.description,
              image: newImage,
              labelText: item.labelText
            };

            return item;
          });
        }

        finished(null, parameters);
      },

      4: function (parameters, finished, extras) {
        // Copy title to new metadata structure if present
        var metadata = {
          title: (extras && extras.metadata && extras.metadata.title) ? extras.metadata.title : parameters.title
        };
        extras.metadata = metadata;

        finished(null, parameters, extras);
      }
    }
  };
})();
