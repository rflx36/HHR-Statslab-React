let reloads = 0;
let startTime = 0, endTime = 0;

let resolveEnd: () => void;
export let data_items: Array<Array<any>>;
export async function StartLoading() {
    startTime = performance.now();
    Load();
    await ResolveEndLoad();
}


function ResolveEndLoad() {
    return new Promise<void>(resolve => {
        resolveEnd = resolve;
    });
}

function EndLoading() {
    endTime = performance.now();
    console.log(Math.round(endTime - startTime) + "ms");
    resolveEnd();

}



function Load() {
    let _class = ["warrior", "archer", "cowboy", "mage"];
    let _equips = ["helmets", "armors", "pants", "shoes", "weapons", "shields"];
    let _file_locations = new Array<string>;

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 4; j++) {
            if (i == 5 && j != 0) {
                continue;
            }
            _file_locations.push("./src/assets/Items-Info/" + _class[j] + "_" + _equips[i] + ".json");
           
        }
    }
    _file_locations.push("./src/assets/Items-Info/accessories.json");
    RequestItems(_file_locations);
}

async function RequestItems(urls: Array<string>) {
    try {
        const promises = urls.map(url => fetch(url).then(resp => { return resp.json() }).catch(BadRequestHandler));

        const response = await Promise.all(promises);

        ParsedData(response);
        // console.log(JSON.stringify(response));
        console.log(response);
        data_items = response;
    }
    catch (err) {
        console.log("Error Fetching Data");
        throw err;
    }
}



function ParsedData(data: Array<Array<any>>) {

    let loader_img_cache_container = document.getElementById("loading-cache-cont");
    let images = ``;
    try {
        for (let items of data) {
            for (let item of items) {
                images += `<img src='./src/assets/${item.url}'>`;
            }
        }
    }
    catch (err) {
        throw err;
    }
    loader_img_cache_container!.innerHTML = images;
    EndLoading();

}


function BadRequestHandler() {
    if (reloads > 3) {
        console.log("Error Requesting: Slow Internet?")
        return;
    }
    reloads++;
    Load();
}
