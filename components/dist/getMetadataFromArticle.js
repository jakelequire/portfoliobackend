"use strict";
exports.__esModule = true;
function getMetadataFromArticle(article) {
    var metadata = {};
    var lines = article.split('\n');
    var inMetadata = false;
    for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
        var line = lines_1[_i];
        if (line === '---') {
            if (inMetadata) {
                break;
            }
            else {
                inMetadata = true;
                continue;
            }
        }
        if (inMetadata) {
            var parts = line.split(':');
            if (parts.length > 2) {
                var key = parts[0].trim();
                var value = parts.slice(1).join(':').trim();
                metadata[key] = value;
            }
        }
    }
    return metadata;
}
exports["default"] = getMetadataFromArticle;
