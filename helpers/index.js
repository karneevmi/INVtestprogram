export function xmlParse(response) {
    const feed =[]
    if (response) {
      let parser = new DOMParser()
        const xml = parser.parseFromString(response, "text/xml");
        const posts = xml.getElementsByTagName("item");
        for (const post of Object.values(posts)) {
            const pubDate = post.getElementsByTagName("pubDate")[0]?.innerHTML|| ''
            const description = post.getElementsByTagName("description")[0]?.innerHTML.replace("<![CDATA[", "").replace("]]>", "")|| ''
            const title = post.getElementsByTagName("title")[0]?.innerHTML|| ''
            const link = post.getElementsByTagName("link")[0]?.innerHTML|| ''
            const enclosure = post.getElementsByTagName("enclosure")[0]?.getAttribute('url')|| ''
            feed.push({
                pubDate,
                description,
                title,
                link,
                enclosure
            })
        }
    }
    return feed
}