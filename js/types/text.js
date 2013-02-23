define(['data', 'vm'], function (dataManager, vm) {
    var itemEditorLayer = $('#item-editor-layer');

    return {
        preview: function (data, dom) {
            var textArray;
            var ul;

            if (data.value) {
                ul = $('<ul class="unstyled"></ul>');
                textArray = data.value.split('\n');
                textArray.forEach(function (text) {
                    var li = $('<li></li>');
                    li.text(text);
                    ul.append(li);
                });
                dom.empty().append(ul);
            }
            else {
                dom.text('[empty text]');
            }
            dom[0].cssText = '';
            if (data.position) {
                $.each(data.position, function (key, value) {
                    dom.css(key, value);
                });
            }
            if (data.config) {
                $.each(data.config, function (key, value) {
                    dom.css(key, value);
                });
            }
        },
        showEditor: function (key, page, data, dom) {
            var position = dom.position();
            var width = dom.outerWidth();
            var height = dom.outerHeight();
            var fontSize = dom.css('font-size');
            var lineHeight = dom.css('line-height');
            var editor = $('<textarea></textarea>');

            editor.css('position', 'absolute');
            editor.css('left', position.left + 'px');
            editor.css('top', position.top + 'px');
            editor.css('width', width + 'px');
            editor.css('height', height + 'px');
            editor.css('font-size', fontSize);
            editor.css('line-height', lineHeight);
            editor.val(data.value);

            itemEditorLayer.empty().append(editor);
            itemEditorLayer.show();

            editor.on('input', function (e) {
                var newValue = this.value;
                var page = vm.currentPage();
                var itemData = dataManager.getItem(page, key);

                if (itemData.value != newValue) {
                    dataManager.setValue(page, key, newValue);
                }
            });
            editor.focus();
        },
        hideEditor: function (key, page, dom) {
            itemEditorLayer.hide();
        },
        build: function (data, dom) {
        },
        show: function (data, dom) {
        },
        hide: function (data, dom) {
        }
    };
});