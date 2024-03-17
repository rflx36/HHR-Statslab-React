let reloads = 0;
let startTime = 0, endTime = 0;

let resolveEnd: () => void;
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
    let _class = ["archer", "cowboy", "mage", "warrior"];
    let _equips = ["armors", "helmets", "pants", "shoes", "weapons", "shields"];
    let _file_locations = new Array<string>;

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 6; j++) {
            if (j == 5 && i != 3) {
                continue;
            }
            _file_locations.push("./Items-Info/" + _class[i] + "_" + _equips[j] + ".json");
        }
    }

    RequestItems(_file_locations);
}

async function RequestItems(urls: Array<string>) {
    try {
        const promises = urls.map(url => fetch(url).then(resp => { return resp.json() }).catch(BadRequestHandler));
       
        const response = await Promise.all(promises);

        ParsedData(response);

    }
    catch (err) {
        console.log("Error Fetching Data");
        throw err;
    }
}



export function ParsedData(data: Array<Array<any>>) {

    let loader_img_cache_container = document.getElementById("loading-cache-cont");
    let images = ``;
    try {
        for (let items of data) {
            for (let item of items) {
                images += `<img src='${item.url}'>`;
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
