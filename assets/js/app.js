const currentDate = document.querySelector(".current-date"),
daysTag = document.querySelector(".days"),
prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current month and current year
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const months = ["January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"];

console.log(date, currMonth, currYear);

const renderCalendar = () =>{
    let firstDateOfMonth = new Date(currYear, currMonth, 1).getDay(),//getting first day of the month
    lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(),//getting last date of the month
    lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(),//getting last day of the month
    lastDateOfLastMonth = new Date(currYear, currMonth , 0).getDate();//getting last date of previous month
    let liTag = "";

    for (let i = firstDateOfMonth; i > 0; i--) { //creating li of previous month last days
        liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
        
    }

    for (let i = 1; i <= lastDateOfMonth; i++) { //creating li of all days of the current month

        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                       && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayOfMonth; i < 6; i++) { //creating lis of the next month first days 
        liTag += `<li class="inactive">${i - lastDayOfMonth + 1}</li>`;
        
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon =>{
    icon.addEventListener("click", () =>{ //adding click event on borh icons
        // if clicked icon is previous icon, then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11){
            //creating new date of the current year and month and pass it as a date value
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear(); //updating current year with new date year
            currMonth = date.getMonth(); //updating current month with current new date month
        } else{ //else pass new date as a value
            date = new Date();  
        }
        renderCalendar();
    });
});