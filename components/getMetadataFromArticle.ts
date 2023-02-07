
export default function getMetadataFromArticle(article: string): { [key: string]: any } { 
    const metadata: { [key: string]: any } = {};
    const lines = article.split('\n');
    let inMetadata = false;
    for (const line of lines) {
        if (line === '---') {
            if (inMetadata) {
                break;
            } else {
                inMetadata = true;
                continue;
            }
        }
        if (inMetadata) {
            const parts = line.split(':');
            if(parts.length > 2) {
                const key = parts[0].trim();
                const value = parts.slice(1).join(':').trim();
                metadata[key] = value;
            }
        }
    }
    return metadata;
}