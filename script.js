let content = null;
let image_viewer_close = null;
let image_viewer = null;
let viewer_image = null;
let image_viewer_info = null;
let image_viewer_h1 = null;
let image_viewer_h2 = null;

// Define the ids of content divs
const id_proj_desc_menu_img = "menu-img-deep";
const id_proj_desc = "project-desc";
const id_proj_desc_txt = "project_desc";
const id_proj_desc_auth = "project_desc_auth_works";
const id_proj_desc_ai = "project_desc_ai_works";

const id_grohar_menu_img = "menu-img-grohar";
const id_grohar = "grohar";
const id_grohar_txt = "grohar_desc";
const id_grohar_auth = "grohar_auth_works";
const id_grohar_ai = "grohar_ai_works";

const id_sternen_menu_img = "menu-img-sternen";
const id_sternen = "sternen";
const id_sternen_txt = "sternen_desc";
const id_sternen_auth = "sternen_auth_works";
const id_sternen_ai = "sternen_ai_works";

const id_tominc_menu_img = "menu-img-tominc";
const id_tominc = "tominc";
const id_tominc_txt = "tominc_desc";
const id_tominc_auth = "tominc_auth_works";
const id_tominc_ai = "tominc_ai_works";


// Starting div should be the project description
let current_active_id = id_proj_desc;
let current_menu_img_active_id = id_proj_desc_menu_img;

// On page load, perform setup
window.addEventListener("load", (event) => {
    setupPage();
});

// Function to set up the listeners on the menu items
function setupPage() {
    content = document.getElementById("content");
    // Set up the image viewer
    image_viewer = document.getElementById("image-viewer");
    image_viewer_close = document.getElementById("image-viewer-close");
    image_viewer_close.addEventListener("click", function () {
        closeImageViewer();
    });
    viewer_image = document.getElementById("viewer-image");
    image_viewer_info = document.getElementById("id-viewer-info");
    image_viewer_h1 = document.getElementById("image-viewer-author");
    image_viewer_h2 = document.getElementById("image-viewer-title");
    // Set up the menu
    const menu = document.getElementById("menu");
    Array.from(document.getElementsByClassName("menu-item")).forEach((item, index) => {
        // Set active index on mouseOver
        item.onmouseover = () => {
            menu.dataset.activeIndex = index;
        };
        // Add onClick listener to switch selected topics on click
        item.addEventListener("click", function () {
            selectTopic(index);
        });
    });
    // Set up the project info
    document.getElementById(id_proj_desc_txt).innerText = json_data.o_projektu_txt;
    // Generate images inside divs for the authentic part
    generateImageDivs(id_proj_desc_auth, json_data.o_projektu_authentic, 3, true, true);
    // Generate images for the AI part
    generateImageDivs(id_proj_desc_ai, json_data.o_projektu_ai, 3, false, true);
    // Setup Grohar page
    document.getElementById(id_grohar_txt).innerText = json_data.grohar_txt;
    generateImageDivs(id_grohar_auth, json_data.grohar_authentic, 3, false, true);
    generateImageDivs(id_grohar_ai, json_data.ivan_grohar_ai, 3, false, true);
    // Setup Tominc page
    document.getElementById(id_tominc_txt).innerText = json_data.tominc_txt;
    generateImageDivs(id_tominc_auth, json_data.tominc_authentic, 3, false, true);
    generateImageDivs(id_tominc_ai, json_data.jozef_tominc_ai, 3, false, true);
    // Setup Sternen page
    document.getElementById(id_sternen_txt).innerText = json_data.sternen_txt;
    generateImageDivs(id_sternen_auth, json_data.sternen_authentic, 3, false, true);
    generateImageDivs(id_sternen_ai, json_data.matej_sternen_ai, 3, false, true);
}
/**
 * parentId ->
 *
 *
 * **/
function generateImageDivs(parentId, elList, perRow, author, title) {
    let counter = 0;
    const parent = document.getElementById(parentId);
    let rowDiv = document.createElement("div");
    elList.forEach((el) => {
        let div = document.createElement("div");
        let img = document.createElement("img");
        img.setAttribute("src", el.src);
        div.appendChild(img);
        img.addEventListener("click", function() {
            showInImageViewer(el);
        });
        div.classList.add("relative");
        if (title) {
            let _h2 = document.createElement("h2");
            _h2.innerText = el["title"];
            div.appendChild(_h2);
        }
        if (author) {
            let _h1 = document.createElement("h1");
            _h1.innerText = el["author"];
            div.appendChild(_h1);
        }

        if (el["trained"]) {
            let _div = document.createElement("div");
            _div.classList.add("learning");
            div.appendChild(_div);
        }

        if (counter > perRow - 1) {
            parent.appendChild(rowDiv);
            rowDiv = document.createElement("div");
            counter = 0;
        }

        rowDiv.appendChild(div);
        counter++;
    });
    parent.appendChild(rowDiv);
}



// Opens the clicked image in an image viewer
function showInImageViewer(el) {
    let author = "Stable Diffusion 2";
    let title = null;
    if (el["author"]) {
        author = el["author"];
    }
    if (el["title"]) {
        title = el["title"];
    }
    // Set author and title from json
    image_viewer_h1.innerText = author;
    image_viewer_h2.innerText = title;
    // Display the image
    viewer_image.setAttribute("src", el.src);
    image_viewer.setAttribute("style", "display: block");
   /* let image_width = viewer_image.getBoundingClientRect().width;
    setTimeout(() => {
        console.log(viewer_image.getBoundingClientRect());
    }, 1000)

    image_viewer_info.setAttribute("style", `max-width:10px`);*/

}

function closeImageViewer() {
    image_viewer.setAttribute("style", "");
}

// Sets the displayed topic based on the index of
// the element clicked in the menu
function selectTopic(ix) {
    switch (ix) {
        case 0:
            setActive(id_proj_desc, id_proj_desc_menu_img);
            break;
        case 1:
            setActive(id_grohar, id_grohar_menu_img);
            break;
        case 2:
            setActive(id_tominc, id_tominc_menu_img);
            break;
        case 3:
            setActive(id_sternen, id_sternen_menu_img);
            break;
        default:
            console.log("You are doing something wrong bro.");
    }
}

function setActive(active_id, active_menu_img_id) {
    // Don't reset if already set
    if (active_id === current_active_id) {
        return;
    }
    // Hide current
    const curr = document.getElementById(current_active_id);
    const curr_menu_img = document.getElementById(current_menu_img_active_id);
    curr.classList.remove("show");
    curr.classList.add("hide");
    curr_menu_img.classList.remove("show");
    curr_menu_img.classList.add("hide");

    // Show the clicked one
    const next = document.getElementById(active_id);
    const next_menu_img = document.getElementById(active_menu_img_id);
    next.classList.remove("hide");
    next.classList.add("show");
    next_menu_img.classList.remove("hide");
    next_menu_img.classList.add("show");

    // Return the scroll to the top of div
    $(content).scrollTop(0);
    // Swap
    current_active_id = active_id;
    current_menu_img_active_id = active_menu_img_id;
}

const json_data = {
    o_projektu_txt:
        "Cilj projekta je prikazati kako močno so tehnike strojnega učenja v zadnjih letih napredovale in prikazati,kako strojno učenje revolucionarna tudi področja, ki so še pred kratkim veljala kot nekaj nedotakljivega strojem. Stable diffusion je tehnika strojnega učenja, ki omogoča ustvarjanje zelo realističnih slik z iterativnim izboljševanjem vhodne slike hrupa z uporabo nevronske mreže. Ena od ključnih lastnost modela Stable Diffusion je ustvarjanje del v specifičnem slogu slikarjev tako, da izberemo nekaj del, ki dobro predstavljajo slikarjev stil in zgornje plasti modela natreniramo z izbranimi deli. Model nam nato omogoča generiranje slik na podlagi vhodnega teksta.",
    o_projektu_authentic: [
        {
            src: "assets/images/ivan_grohar_real/Sejalec.jpg",
            title: "Sejalec",
            author: "Ivan Grohar",
        },
        {
            src: "assets/images/matej_sternen_real/Rdeči%20parazol.jpg",
            title: "Rdeči Parazol",
            author: "Matej Sternen",
        },
        {
            src: "assets/images/jozef_tominc_real/Portret%20očeta.jpg",
            title: "Portret Očeta",
            author: "Jožef Tominc",
        },
    ],
    o_projektu_ai: [
        {
            src: "assets/images/ivan_grohar_ai/2.jpg",
            title: "V stilu Ivana Groharja",
        },
        {
            src: "assets/images/matej_sternen_ai/91.jpg",
            title: "V stilu Mateja Sternena",
        },
        {
            src: "assets/images/jozef_tominc_ai/11.jpg",
            title: "V stilu Jožefa Tominca",
        },
    ],
    grohar_txt:
        "Grohar je najbolj lirična osebnost impresionističnega desetletja na začetku 20. stoletja. Kljub izjemni nadarjenosti zaradi pomanjkljive izobrazbe ni mogel nadaljevati graškega šolanja na dunajski akademiji. Po bivanju v Münchnu je izpolnjeval cerkvena naročila. Prelom stoletij je pomenil tudi prelom v njegovem slogu. Hitro je začel razvijati svojo lastno tehniko slikanja, ki jo je deloma izpeljal iz divizionizma in povezal s simbolizmom in s secesijo. Neuspehi in samosvoja narava so ga privedli v Škofjo Loko, kjer se je ustalil leta 1904. Tam je ustvaril svoja najboljša dela, ki od krajinske motivike prehajajo v monumentalne prizore kmečkega dela. Nekaj dni pred odhodom na študijsko potovanje v Italijo je umrl v ljubljanski bolnišnici, izčrpan od jetike.",
    grohar_authentic: [
        {
            src: "assets/images/ivan_grohar_real/Sejalec.jpg",
            title: "Sejalec",
            author: "Ivan Grohar",
            trained: true,
        },
        {
            src: "assets/images/ivan_grohar_real/Macesen.jpg",
            title: "Macesen",
            author: "Ivan Grohar",
        },
        {
            src: "assets/images/ivan_grohar_real/Pomlad.jpg",
            title: "Pomlad",
            author: "Ivan Grohar",
            trained: true,
        },
        {
            src: "assets/images/ivan_grohar_real/Štemarski%20vrt.jpg",
            title: "Štemarski vrt",
            author: "Ivan Grohar",
            trained: true,
        },
        {
            src: "assets/images/ivan_grohar_real/Grabljice.jpg",
            title: "Grabljice",
            author: "Ivan Grohar",
            trained: true,
        },
        {
            src: "assets/images/ivan_grohar_real/Kamnitnik.jpg",
            title: "Kamnitnik",
            author: "Ivan Grohar",
            trained: true,
        },
    ],
    tominc_txt:
        "Tominc je bidermajerski portretist, ki se je uveljavil predvsem v goriškem in v tržaškem okolju. Poleg posameznih portretov se je z občutkom loteval tudi skupinskih, o slikarjevem značaju pa nam največ povedo njegovi temperamentni in s hudomušno noto obarvani avtoportreti. Tominc je portretirance rahlo idealiziral in psihološko karakteriziral, pretanjeno je slikal inkarnat, lesk oblačil in odseve. Njegova dela pomenijo vrhunec umetnosti na Slovenskem v prvi polovici 19. stoletja.",
    tominc_authentic: [
        {
            src: "assets/images/jozef_tominc_real/Avtoportret%20ob%20oknu.jpg",
            title: "Avtoportret ob oknu",
            author: "Jožef Tominc",
            trained: true,
        },
        {
            src: "assets/images/jozef_tominc_real/Cecilija%20grofica%20Auersperg.jpg",
            title: "Cecilija grofica Auersperg",
            author: "Jožef Tominc",
            trained: true,
        },
        {
            src: "assets/images/jozef_tominc_real/Družina%20dr.%20Frušića.jpg",
            title: "Družina dr. Frušića",
            author: "Jožef Tominc",
            trained: true,
        },
        {
            src: "assets/images/jozef_tominc_real/Kapitan%20Polić.jpg",
            title: "Kapitan Polić",
            author: "Jožef Tominc",
            trained: true,
        },
        {
            src: "assets/images/jozef_tominc_real/Portret%20očeta.jpg",
            title: "Portret očeta",
            author: "Jožef Tominc",
            trained: true,
        },
        {
            src: "assets/images/jozef_tominc_real/Tri%20dame%20iz%20družine%20Moscon.jpg",
            title: "Tri dame iz družine Moscon",
            author: "Jožef Tominc",
        },
    ],
    sternen_txt:
        "Sternen je bil risar, restavrator, grafik in pedagog, predvsem pa tehnično odlično izurjen slikar. Med slovenskimi impresionisti je edini dokončal akademijo, in to na Dunaju. Živel je tudi v Münchnu in hodil v Ažbetovo slikarsko šolo. Uveljavil se je kot slikar ženske figure, v njegovem opusu pa prevladujejo akti, portreti in vedute. Njegov slikarski princip je temeljil na stvarnem opazovanju predmeta in ne v čustvenem vživljanju, kot impresionist pa se je razkrival z obravnavo optičnih učinkov, z dinamičnim kadriranjem in s pastoznim nanašanjem barve.",
    sternen_authentic: [
        {
            src: "assets/images/matej_sternen_real/Rdeči%20parazol.jpg",
            title: "Rdeči parazol",
            author: "Matej Sternen",
            trained: true,
        },
        {
            src: "assets/images/matej_sternen_real/Rdečelaska.jpg",
            title: "Rdečelaska",
            author: "Matej Sternen",
        },
        {
            src: "assets/images/matej_sternen_real/Rozi%20Klein.jpg",
            title: "Rozi Klein",
            author: "Matej Sternen",
            trained: true,
        },
        {
            src: "assets/images/matej_sternen_real/Tončka%20Gaber.jpg",
            title: "Tončka Gaber",
            author: "Matej Sternen",
            trained: true,
        },
        {
            src: "assets/images/matej_sternen_real/Akt%20z%20dvignjenima%20rokama.jpg",
            title: "Akt z dvignjenima rokama",
            author: "Matej Sternen",
            trained: true,
        },
        {
            src: "assets/images/matej_sternen_real/Akt.jpg",
            title: "Akt",
            author: "Matej Sternen",
            trained: true,
        },
    ],
    ivan_grohar_ai: [
        {
            src: "./assets/images/ivan_grohar_ai/0.jpg",
            title: "Painting of a farmer on snowy field in <ivan-grohar> style",
        },
        {
            src: "./assets/images/ivan_grohar_ai/2.jpg",
            title: "Painting of a farmer on snowy field in <ivan-grohar> style",
        },
        {
            src: "./assets/images/ivan_grohar_ai/3.jpg",
            title: "Painting of a farmer on snowy field in <ivan-grohar> style",
        },
        {
            src: "./assets/images/ivan_grohar_ai/96.jpg",
            title: "Painting of farmers working on a snowy field in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/97.jpg",
            title: "Painting of farmers working on a snowy field in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/98.jpg",
            title: "Painting of farmers working on a snowy field in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/99.jpg",
            title: "Painting of farmers working on a snowy field in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/4.jpg",
            title: "Painting of countryside in winter in <ivan-grohar> style",
        },
        {
            src: "./assets/images/ivan_grohar_ai/6.jpg",
            title: "Painting of countryside in winter in <ivan-grohar> style",
        },
        {
            src: "./assets/images/ivan_grohar_ai/7.jpg",
            title: "Painting of countryside in winter in <ivan-grohar> style",
        },
        {
            src: "./assets/images/ivan_grohar_ai/5.jpg",
            title: "Painting of countryside in winter in <ivan-grohar> style",
        },
        {
            src: "./assets/images/ivan_grohar_ai/76.jpg",
            title: "Painting of nature with mountains in background in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/77.jpg",
            title: "Painting of nature with mountains in background in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/78.jpg",
            title: "Painting of nature with mountains in background in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/79.jpg",
            title: "Painting of nature with mountains in background in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/80.jpg",
            title: "Painting of trees in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/81.jpg",
            title: "Painting of trees in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/82.jpg",
            title: "Painting of trees in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/83.jpg",
            title: "Painting of trees in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/92.jpg",
            title: "Painting of a forest with trees in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/93.jpg",
            title: "Painting of a forest with trees in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/94.jpg",
            title: "Painting of a forest with trees in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/95.jpg",
            title: "Painting of a forest with trees in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/10.jpg",
            title: "Painting of a fields in <ivan-grohar> style",
        },
        {
            src: "./assets/images/ivan_grohar_ai/11.jpg",
            title: "Painting of a field in <ivan-grohar> style",
        },
        {
            src: "./assets/images/ivan_grohar_ai/12.jpg",
            title: "Painting of a field in <ivan-grohar> style",
        },
        {
            src: "./assets/images/ivan_grohar_ai/13.jpg",
            title: "Painting of a field in <ivan-grohar> style",
        },
        {
            src: "./assets/images/ivan_grohar_ai/14.jpg",
            title: "Painting of a snowy field in <ivan-grohar> style",
        },
        {
            src: "./assets/images/ivan_grohar_ai/15.jpg",
            title: "Painting of a snowy field in <ivan-grohar> style",
        },
        {
            src: "./assets/images/ivan_grohar_ai/60.jpg",
            title: "Painting of countryside in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/61.jpg",
            title: "Painting of countryside in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/62.jpg",
            title: "Painting of countryside in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/63.jpg",
            title: "Painting of countryside in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/64.jpg",
            title: "Painting of countryside in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/65.jpg",
            title: "Painting of countryside in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/66.jpg",
            title: "Painting of countryside in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/67.jpg",
            title: "Painting of countryside in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/16.jpg",
            title: "Painting of a snowy city in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/17.jpg",
            title: "Painting of a snowy city in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/18.jpg",
            title: "Painting of a snowy city in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/19.jpg",
            title: "Painting of a snowy city in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/20.jpg",
            title: "Painting of a snowy city in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/21.jpg",
            title: "Painting of a snowy city in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/22.jpg",
            title: "Painting of a snowy city in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/23.jpg",
            title: "Painting of a city in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/24.jpg",
            title: "Painting of a city in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/25.jpg",
            title: "Painting of a city in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/26.jpg",
            title: "Painting of a city in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/27.jpg",
            title: "Painting of a city in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/28.jpg",
            title: "Painting of a blossoming cherry tree in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/29.jpg",
            title: "Painting of a blossoming cherry tree in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/30.jpg",
            title: "Painting of a blossoming cherry tree in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/31.jpg",
            title: "Painting of a blossoming cherry tree in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/32.jpg",
            title: "Painting of a poppy in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/33.jpg",
            title: "Painting of a red cherry tree in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/34.jpg",
            title: "Painting of a red cherry tree in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/35.jpg",
            title: "Painting of a red cherry tree in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/36.jpg",
            title: "Painting of farmers on winter fields in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/37.jpg",
            title: "Painting of farmers on winter fields in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/38.jpg",
            title: "Painting of farmers on winter fields in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/39.jpg",
            title: "Painting of farmers on winter fields in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/40.jpg",
            title: "Close up portrait of a woman in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/41.jpg",
            title: "Close up portrait of a woman in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/42.jpg",
            title: "Close up portrait of a woman in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/43.jpg",
            title: "Close up portrait of a woman in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/44.jpg",
            title: "Close up portrait of a woman in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/45.jpg",
            title: "Close up portrait of a woman in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/46.jpg",
            title: "Close up portrait of a woman in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/47.jpg",
            title: "Close up portrait of a woman in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/48.jpg",
            title: "Painting of a person on the field in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/49.jpg",
            title: "Painting of a person on the field in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/50.jpg",
            title: "Painting of a person on the field in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/51.jpg",
            title: "Painting of a people working on the field in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/52.jpg",
            title: "Painting of a people working on the field in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/53.jpg",
            title: "Painting of a people working on the field in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/54.jpg",
            title: "Painting of a people working on the field in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/55.jpg",
            title: "Painting of a people working on the field in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/56.jpg",
            title: "Painting of a people working on the field in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/57.jpg",
            title: "Painting of a people working on the field in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/58.jpg",
            title: "Painting of a people working on the field in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/59.jpg",
            title: "Painting of a people working on the field in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/68.jpg",
            title: "Painting of  working on the field in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/69.jpg",
            title: "Painting of  working on the field in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/70.jpg",
            title: "Painting of  working on the field in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/71.jpg",
            title: "Painting of  working on the field in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/72.jpg",
            title: "Painting of fields in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/73.jpg",
            title: "Painting of fields in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/74.jpg",
            title: "Painting of fields in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/75.jpg",
            title: "Painting of fields in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/84.jpg",
            title: "Farmers having dinner on the countryside in style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/85.jpg",
            title: "Farmers having dinner on the countryside in style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/86.jpg",
            title: "Farmers having dinner on the countryside in style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/87.jpg",
            title: "Farmers having dinner on the countryside in style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/88.jpg",
            title: "Farmers having dinner on the countryside in style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/89.jpg",
            title: "Farmers having dinner on the countryside in style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/90.jpg",
            title: "Painting of people on the fields in the style of <ivan-grohar>",
        },
        {
            src: "./assets/images/ivan_grohar_ai/91.jpg",
            title: "Painting of people on the fields in the style of <ivan-grohar>",
        },
    ],
    "matej_sternen_ai": [
        {
            "src": "./assets/images/matej_sternen_ai/40.jpg",
            "title": "Painting in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/41.jpg",
            "title": "Painting in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/42.jpg",
            "title": "Painting in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/43.jpg",
            "title": "Painting in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/44.jpg",
            "title": "Painting in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/45.jpg",
            "title": "Painting in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/46.jpg",
            "title": "Painting in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/47.jpg",
            "title": "Painting in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/88.jpg",
            "title": "Painting in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/48.jpg",
            "title": "Painting of a wedding couple in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/49.jpg",
            "title": "Painting of a wedding couple in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/50.jpg",
            "title": "Painting of a wedding couple in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/51.jpg",
            "title": "Painting of a wedding couple in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/52.jpg",
            "title": "Portrait of a victorian woman sitting on a chair in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/53.jpg",
            "title": "Portrait of a victorian woman sitting on a chair in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/54.jpg",
            "title": "Portrait of a victorian woman sitting on a chair in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/55.jpg",
            "title": "Portrait of a victorian woman sitting on a chair in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/56.jpg",
            "title": "Portrait of a victorian woman sitting on a chair in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/57.jpg",
            "title": "Portrait of a victorian woman sitting on a chair in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/58.jpg",
            "title": "Portrait of a victorian woman sitting on a chair in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/59.jpg",
            "title": "Portrait of a victorian woman sitting on a chair in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/60.jpg",
            "title": "Portrait of a victorian woman sitting on a chair in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/61.jpg",
            "title": "Portrait of a victorian woman sitting on a chair in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/62.jpg",
            "title": "Portrait of a victorian woman sitting on a chair in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/63.jpg",
            "title": "Portrait of a victorian woman sitting on a chair in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/64.jpg",
            "title": "Portrait of a victorian woman sitting on a chair in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/65.jpg",
            "title": "Portrait of a victorian woman sitting on a chair in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/66.jpg",
            "title": "Portrait of a victorian woman sitting on a chair in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/67.jpg",
            "title": "Portrait of a victorian woman sitting on a chair in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/68.jpg",
            "title": "Portrait of a victorian woman sitting on a chair in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/69.jpg",
            "title": "Portrait of a victorian woman sitting on a chair in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/70.jpg",
            "title": "Portrait of a victorian woman sitting on a chair in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/71.jpg",
            "title": "Portrait of a victorian woman sitting on a chair in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/72.jpg",
            "title": "Painting of a girl in style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/78.jpg",
            "title": "Portrait of a girl lying on a bed in style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/79.jpg",
            "title": "Portrait of a girl lying on a bed in style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/80.jpg",
            "title": "Portrait of a girl lying on a bed in style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/81.jpg",
            "title": "Portrait of a girl lying on a bed in style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/82.jpg",
            "title": "Portrait of a girl lying on a bed in style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/83.jpg",
            "title": "Portrait of a girl lying on a bed in style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/92.jpg",
            "title": "Painting of a naked woman body in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/93.jpg",
            "title": "Painting of a naked woman body in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/94.jpg",
            "title": "Painting of a naked woman body in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/95.jpg",
            "title": "Painting of a naked woman body in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/105.jpg",
            "title": "Painting of a girl posing in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/106.jpg",
            "title": "Painting of a girl posing in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/107.jpg",
            "title": "Painting of a girl posing in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/108.jpg",
            "title": "Painting of a girl posing on a sofa in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/110.jpg",
            "title": "Painting of a girl posing on a sofa in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/111.jpg",
            "title": "Painting of a girl posing on a sofa in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/112.jpg",
            "title": "Painting of a naked girl on a bed in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/117.jpg",
            "title": "Painting of a naked girl on a bed in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/118.jpg",
            "title": "Painting of a naked girl on a bed in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/119.jpg",
            "title": "Painting of a naked girl on a bed in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/120.jpg",
            "title": "Painting of a victorian street in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/121.jpg",
            "title": "Painting of a victorian street in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/122.jpg",
            "title": "Painting of a victorian street in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/123.jpg",
            "title": "Painting of a victorian street in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/0.jpg",
            "title": "Painting of city streets in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/1.jpg",
            "title": "Painting of city streets in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/2.jpg",
            "title": "Painting of city streets in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/3.jpg",
            "title": "Painting of city streets in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/4.jpg",
            "title": "Still life in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/5.jpg",
            "title": "Still life in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/6.jpg",
            "title": "Still life in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/7.jpg",
            "title": "Still life in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/8.jpg",
            "title": "Painting of a bedroom in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/9.jpg",
            "title": "Painting of a bedroom in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/10.jpg",
            "title": "Painting of a bedroom in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/11.jpg",
            "title": "Painting of a bedroom in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/12.jpg",
            "title": "Painting of umbrella and rain in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/13.jpg",
            "title": "Painting of umbrella and rain in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/14.jpg",
            "title": "Painting of umbrella and rain in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/15.jpg",
            "title": "Painting of umbrella and rain in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/16.jpg",
            "title": "Painting of a naked woman posing the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/17.jpg",
            "title": "Painting of a naked woman posing the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/18.jpg",
            "title": "Painting of a naked woman posing the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/19.jpg",
            "title": "Painting of a naked woman lying on bed in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/20.jpg",
            "title": "Painting of a naked woman lying on bed in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/21.jpg",
            "title": "Painting of a naked woman lying on bed in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/22.jpg",
            "title": "Painting of a naked woman lying on bed in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/23.jpg",
            "title": "Painting of a little girl in a room in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/24.jpg",
            "title": "Painting of a little girl in a room in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/25.jpg",
            "title": "Painting of a little girl in a room in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/26.jpg",
            "title": "Painting of a little girl in a room in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/31.jpg",
            "title": "Painting of a little girl in a room in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/32.jpg",
            "title": "Painting of a mother breastfeeding in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/33.jpg",
            "title": "Painting of a mother breastfeeding in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/34.jpg",
            "title": "Painting of a mother breastfeeding in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/35.jpg",
            "title": "Painting of a mother breastfeeding in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/89.jpg",
            "title": "Painting in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/90.jpg",
            "title": "Painting in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/91.jpg",
            "title": "Painting in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/96.jpg",
            "title": "Painting in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/97.jpg",
            "title": "Painting in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/98.jpg",
            "title": "Painting in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/99.jpg",
            "title": "Painting in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/100.jpg",
            "title": "Painting in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/101.jpg",
            "title": "Painting in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/102.jpg",
            "title": "Painting in the style of <matej-sternen>"
        },
        {
            "src": "./assets/images/matej_sternen_ai/103.jpg",
            "title": "Painting in the style of <matej-sternen>"
        },
    ],
    "jozef_tominc_ai": [
        {
            "src": "./assets/images/jozef_tominc_ai/0.jpg",
            "title": "Painting of a woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/1.jpg",
            "title": "Painting of a woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/2.jpg",
            "title": "Painting of a woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/3.jpg",
            "title": "Painting of a woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/4.jpg",
            "title": "Painting of a woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/5.jpg",
            "title": "Painting of a woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/6.jpg",
            "title": "Painting of a woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/7.jpg",
            "title": "Painting of a woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/8.jpg",
            "title": "Painting of a woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/9.jpg",
            "title": "Painting of a woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/10.jpg",
            "title": "Painting of a woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/11.jpg",
            "title": "Painting of a woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/12.jpg",
            "title": "Painting of a woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/13.jpg",
            "title": "Painting of a woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/14.jpg",
            "title": "Painting of a woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/15.jpg",
            "title": "Painting of a woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/47.jpg",
            "title": "Painting of a man in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/16.jpg",
            "title": "Painting of a man in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/17.jpg",
            "title": "Painting of a man in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/18.jpg",
            "title": "Painting of a man in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/19.jpg",
            "title": "Painting of a bald man in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/20.jpg",
            "title": "Painting of a bald man in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/21.jpg",
            "title": "Painting of a bald man in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/22.jpg",
            "title": "Painting of a bald man in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/23.jpg",
            "title": "Painting of a bald man in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/25.jpg",
            "title": "Portrait of a child in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/26.jpg",
            "title": "Portrait of a child in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/27.jpg",
            "title": "Portrait of a child in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/28.jpg",
            "title": "Portrait of a man in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/29.jpg",
            "title": "Portrait of a man in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/30.jpg",
            "title": "Portrait of a man in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/31.jpg",
            "title": "Portrait of a man in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/32.jpg",
            "title": "Portrait of a man in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/33.jpg",
            "title": "Portrait of a man in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/34.jpg",
            "title": "Portrait of a man in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/35.jpg",
            "title": "Portrait of a man in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/36.jpg",
            "title": "Painting of a victorian woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/37.jpg",
            "title": "Painting of a victorian woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/38.jpg",
            "title": "Painting of a victorian woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/39.jpg",
            "title": "Painting of a victorian woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/40.jpg",
            "title": "Portrait of a young child in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/41.jpg",
            "title": "Portrait of a young child in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/42.jpg",
            "title": "Portrait of a young child in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/43.jpg",
            "title": "Portrait of a young child in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/44.jpg",
            "title": "Photo of a victorian family in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/45.jpg",
            "title": "Photo of a victorian family in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/46.jpg",
            "title": "Photo of a victorian family in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/48.jpg",
            "title": "Group photo in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/49.jpg",
            "title": "Group photo in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/50.jpg",
            "title": "Group photo in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/51.jpg",
            "title": "Group photo in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/52.jpg",
            "title": "Painting of a victorian woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/53.jpg",
            "title": "Painting of a victorian woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/54.jpg",
            "title": "Painting of a victorian woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/55.jpg",
            "title": "Painting of a victorian woman in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/56.jpg",
            "title": "Painting of a victorian family in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/57.jpg",
            "title": "Painting of a victorian family in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/58.jpg",
            "title": "Painting of a victorian family in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/59.jpg",
            "title": "Painting of a victorian family in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/60.jpg",
            "title": "Painting in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/61.jpg",
            "title": "Painting in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/62.jpg",
            "title": "Painting in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/63.jpg",
            "title": "Painting in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/64.jpg",
            "title": "Painting of victorian businessmen in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/65.jpg",
            "title": "Painting of victorian businessmen in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/66.jpg",
            "title": "Painting of victorian businessmen in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/67.jpg",
            "title": "Painting of victorian businessmen in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/68.jpg",
            "title": "Painting of a victorian family sitting on a chair in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/69.jpg",
            "title": "Painting of a victorian family sitting on a chair in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/70.jpg",
            "title": "Painting of a victorian family sitting on a chair in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/71.jpg",
            "title": "Painting of a victorian family sitting on a chair in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/72.jpg",
            "title": "Painting of a victorian family sitting on a chair in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/73.jpg",
            "title": "Painting of a victorian family sitting on a chair in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/74.jpg",
            "title": "Painting of a victorian family sitting on a chair in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/75.jpg",
            "title": "Painting of a victorian family sitting on a chair in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/76.jpg",
            "title": "Painting of a victorian family sitting on a chair in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/77.jpg",
            "title": "Painting of a victorian family sitting on a chair in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/78.jpg",
            "title": "Painting of a victorian family sitting on a chair in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/79.jpg",
            "title": "Painting of a victorian family sitting on a chair in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/80.jpg",
            "title": "Painting of a victorian family sitting on a chair in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/81.jpg",
            "title": "Painting of a victorian family sitting on a chair in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/82.jpg",
            "title": "Painting of a victorian family sitting on a chair in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/83.jpg",
            "title": "Painting of a victorian family sitting on a chair in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/84.jpg",
            "title": "Portrait of a man in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/85.jpg",
            "title": "Portrait of a man in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/86.jpg",
            "title": "Portrait of a man in the style of <jozef-tominc>"
        },
        {
            "src": "./assets/images/jozef_tominc_ai/87.jpg",
            "title": "Portrait of a man in the style of <jozef-tominc>"
        }
    ]
};
