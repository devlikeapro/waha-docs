import docsearch from "@docsearch/js";

docsearch({
    container: "#docsearch",
    appId: "OV9LGQBN5C",
    apiKey: "7005679dc522e856719f3270aac826a1",
    indexName: "wahalike",
    insights: true
});

const onClick = function () {
    document.getElementsByClassName("DocSearch-Button")[0].click();
};

document.getElementById("searchToggleMobileDocSearch").onclick = onClick;
document.getElementById("searchToggleDesktopDocSearch").onclick = onClick;