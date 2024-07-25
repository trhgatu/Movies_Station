/* Button Status */

const buttonStatus = document.querySelectorAll("[button-status]");

if(buttonStatus.length > 0){
    let url = new URL(window.location.href);
    buttonStatus.forEach(button => {
        button.addEventListener("click", () =>{
            const status = button.getAttribute("button-status");
            if(status){
                url.searchParams.set("status", status);
            }else{
                url.searchParams.delete("status");
            }
            window.location.href = url.href;
        });
    });
}
/* Button Status End*/


/* Form Search */

const formSearch = document.querySelector("#form-search");

formSearch.addEventListener("submit", (e) => {
    let url = new URL(window.location.href);
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;

    if(keyword){
        url.searchParams.set("keyword", keyword);
    }else{
        url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
});

/* Form Search End */

/* Pagination */
const btnsPagination = document.querySelectorAll("[button-pagination]");
if(btnsPagination){
    let url = new URL(window.location.href);

    btnsPagination.forEach(button => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination");
            if(page){
                url.searchParams.set("page", page);
            }
            window.location.href = url.href;
        })

    })
}
/* End Pagination */