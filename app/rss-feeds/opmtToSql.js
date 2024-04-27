const fs = require ("fs");

const readFile = async (path) => {
    console.log("Reading file");
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) {
                console.error("Error reading file: " + err);
                reject(err);
                return;
            }
            resolve(data.toString());
        });
    });
};

const parseOpmlToJson = (opmlData) => {
    const opmlJson = [];
    const lines = opmlData.split("\n").map((line) => line.trim());
    let outline = null;
    lines.forEach((line) => {
        if (line.startsWith("<outline")) {
            outline = {};
            const attributes = line
                .substring(line.indexOf("<outline") + 8, line.lastIndexOf("/>") - 1)
                .split('" ')
                .map((attribute) => attribute.split('="'));
            attributes.forEach(([key, value]) => {
                outline[key] = value;
            });
            opmlJson.push(outline);
        }
    });
    return opmlJson;
};

let categories = ''

const sql = (line) => {
    if(!line["xmlUrl"]) return categories = line["title"]
    const url = line["xmlUrl"];
    const name = line["title"];
    const description = line["description"];
    const website = line["xmlUrl"].split("/")[2];
    return query(url, name, description, website, categories);
}

const writeInFile = (data) => {
    fs.writeFile("./app/rss-feeds/countries.sql", data, (err) => {
        if (err) {
            console.error("Error writing file: " + err);
            return;
        }
        console.log("File written");
    });
}

const query = (ulm, name, description, website, categories) => {
    return `INSERT INTO \`feeds\` (\`url\`, \`name\`, \`description\`, \`website\`, \`categories\`) VALUES ('${ulm}', '${name}', '${description}', '${website}', '${categories}')`
}


const main = async () => {
    const opmlPath = "./app/rss-feeds/countries.opml";
    const opmlData = await readFile(opmlPath);
    const opmlJson = parseOpmlToJson(opmlData);
    const sqls = opmlJson.map((line) => sql(line));
    writeInFile(sqls.join("\n"));
}

main();