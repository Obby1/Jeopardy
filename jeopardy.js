// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [];
let allCategoriesArr = [];
let catObj = [];
// let categoryNames = [];
let count = 0;
let $startBtn = $(`#start`)
// $start.hide();
let gameState = `off`;

//todo: ?Give IDs to each object. Assign corresponding IDs to html table. Access objects by
// clicking on the HTML ID with event handler? 

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
count += 6;
categories = [];
tempCats = [];
let response = await axios.get(`https://jservice.io/api/categories`, {params: {count:100, offset:count}});
response.data.map(el=>{
    // console.log(el.id)
    tempCats.push(el.id);
})
let randomCats= _.sampleSize(tempCats, 6);
//add a loop here that checks with api if clues length is less than 4, if yes, reject category
// try randomCats again. Could add the code here or in getCategory function

categories.push(randomCats);
console.log(`categories array is ${categories}`)
// console.log(`randomCats is ${randomCats}`);
return categories;

//todo: further optimize this code. Could be a way to shorten logic
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */


async function getCategory(catId) {
let response = await axios.get(`https://jservice.io/api/category?id=${catId}`);
// console.log(response.data);
let tempObj = {}
tempObj.title= response.data.title;
// tempObj.showing = `?`,
// tempObj.clues= response.data.clues;
tempObj.clues = response.data.clues.map(el=>({
question: el.question,
answer: el.answer,
showing: `?`,
}));

// tempObj.clues = clues;
// console.log(clues);
// console.log(tempObj);
if (tempObj.clues.length <5){
    location.reload();
 }


return tempObj;
}

// if clues length is less than 4, do not use category?
async function allCategories([categories]){
    for (let category of categories){
        // console.log(category);
       let tempObj= await getCategory(category);
    //    console.log(tempObj);
    allCategoriesArr.push(tempObj);
    }
    //show start button only if all categories succesfully load
    $startBtn.show();
}

// function getAllCats(categories){
// let allCats = categories.map(el => {
//     return getCategory(el)});
// console.log(allCats);
// }

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable(categories) {
    let $table = $(`#jeopardy`);
    let $htmlTable = $(`
    <table>
        <thead>
            <tr>
                <th class="title">
                ${allCategoriesArr[0].title}
                </th>
                <th class="title">
                ${allCategoriesArr[1].title}
                </th>
                <th class="title">
                ${allCategoriesArr[2].title}
                </th>
                <th class="title">
                ${allCategoriesArr[3].title}
                </th>
                <th class="title">
                ${allCategoriesArr[4].title}
                </th>
                <th class="title">
                ${allCategoriesArr[5].title}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="question" data-question-id="0" data-clues-id="0">
                ${allCategoriesArr[0].clues[0].showing}
                </td>
                <td class="question" data-question-id="1" data-clues-id="0">
                ${allCategoriesArr[1].clues[0].showing}
                </td>
                <td class="question" data-question-id="2" data-clues-id="0">
                ${allCategoriesArr[2].clues[0].showing}
                </td>
                <td class="question" data-question-id="3" data-clues-id="0">
                ${allCategoriesArr[3].clues[0].showing}
                </td>
                <td class="question" data-question-id="4" data-clues-id="0">
                ${allCategoriesArr[4].clues[0].showing}
                </td>
                <td class="question" data-question-id="5" data-clues-id="0">
                ${allCategoriesArr[5].clues[0].showing}
                </td>
            </tr>
            <tr>
                <td class="question" data-question-id="0" data-clues-id="1"> 
                ${allCategoriesArr[0].clues[1].showing}
                </td>
                <td class="question" data-question-id="1" data-clues-id="1">
                ${allCategoriesArr[1].clues[1].showing}
                </td>
                <td class="question" data-question-id="2" data-clues-id="1">
                ${allCategoriesArr[2].clues[1].showing}
                </td>
                <td class="question" data-question-id="3" data-clues-id="1">
                ${allCategoriesArr[3].clues[1].showing}
                </td>
                <td class="question" data-question-id="4" data-clues-id="1">
                ${allCategoriesArr[4].clues[1].showing}    
                </td>
                <td class="question" data-question-id="5" data-clues-id="1">
                ${allCategoriesArr[5].clues[1].showing}
                </td>
            </tr>
                <tr>
                <td class="question" data-question-id="0" data-clues-id="2">
                ${allCategoriesArr[0].clues[2].showing}
                </td>
                <td class="question" data-question-id="1" data-clues-id="2">
                ${allCategoriesArr[1].clues[2].showing}
                </td>
                <td class="question" data-question-id="2" data-clues-id="2">
                ${allCategoriesArr[2].clues[2].showing}
                </td>
                <td class="question" data-question-id="3" data-clues-id="2">
                ${allCategoriesArr[3].clues[2].showing}
                </td>
                <td class="question" data-question-id="4" data-clues-id="2">
                ${allCategoriesArr[4].clues[2].showing}     
                </td>
                <td class="question" data-question-id="5" data-clues-id="2">
                ${allCategoriesArr[5].clues[2].showing}
                </td>
            </tr>
                <tr>
                <td class="question" data-question-id="0" data-clues-id="3">
                ${allCategoriesArr[0].clues[3].showing}
                </td>
                <td class="question" data-question-id="1" data-clues-id="3">
                ${allCategoriesArr[1].clues[3].showing}
                </td>
                <td class="question" data-question-id="2" data-clues-id="3">
                ${allCategoriesArr[2].clues[3].showing}
                </td>
                <td class="question" data-question-id="3" data-clues-id="3">
                ${allCategoriesArr[3].clues[3].showing}
                </td>
                <td class="question" data-question-id="4" data-clues-id="3">
                ${allCategoriesArr[4].clues[3].showing}     
                </td>
                <td class="question" data-question-id="5" data-clues-id="3">
                ${allCategoriesArr[5].clues[3].showing}
                </td>
            </tr>
            <tr>
                <td class="question" data-question-id="0" data-clues-id="4">
                ${allCategoriesArr[0].clues[4].showing}
                </td>
                <td class="question" data-question-id="1" data-clues-id="4">
                ${allCategoriesArr[1].clues[4].showing}
                </td>
                <td class="question" data-question-id="2" data-clues-id="4">
                ${allCategoriesArr[2].clues[4].showing}
                </td>
                <td class="question" data-question-id="3" data-clues-id="4">
                ${allCategoriesArr[3].clues[4].showing}
                </td>
                <td class="question" data-question-id="4" data-clues-id="4">
                ${allCategoriesArr[4].clues[4].showing}    
                </td>
                <td class="question" data-question-id="5" data-clues-id="4">
                ${allCategoriesArr[5].clues[4].showing}
                </td>
            </tr>
        
    
    
        </tbody>
    </table>
    
    `)
    $table.append($htmlTable);
    //after table successfully loads, hide spinner & change button text
    hideLoadingView();
    changeStartBtn();
    }



/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

// function handleClick(evt) {
//     console.log(evt.target.id);
// }

//what if I used 2 data attributes in table? 1 for categories arr 1 for clues arr
//allCategories[0].clues[0]
//evt.target.closest.question.data"cluesid"
//need to change .showing to updated property and also refresh that dom element. JQ
//or a recent unit has funcitonality for this. 

//access clues array with clueId - clues[clueId] = {cluesobject.question etc}
// let clue = clues[event.target.dataset.clueId];
// how to assign clueId dynamically after getting clues from API?
$(`#jeopardy`).on("click", function handleClick(evt){
// let clue = e.target.dataset.id;
let questionId = $(evt.target).closest(".question").data("question-id");
let clueId = $(evt.target).closest(".question").data("clues-id");
console.log(`jQ question id ${questionId}`);
console.log(`jQ clue id ${clueId}`);
console.log(allCategoriesArr[questionId].clues[clueId]);

//if showing is ? set to clue question
if (allCategoriesArr[questionId].clues[clueId].showing === `?`){
    allCategoriesArr[questionId].clues[clueId].showing = allCategoriesArr[questionId].clues[clueId].question;
    console.log(`? -> question working`);
    console.log(allCategoriesArr[questionId].clues[clueId].question);
    let $selection = $(evt.target).closest(".question");
    // $selection.html(`test`);
    $selection.addClass(`text-question`);
    $selection.html(allCategoriesArr[questionId].clues[clueId].showing);
} //if showing is set to question, set showing to answer
else if (allCategoriesArr[questionId].clues[clueId].showing === allCategoriesArr[questionId].clues[clueId].question){
    allCategoriesArr[questionId].clues[clueId].showing = allCategoriesArr[questionId].clues[clueId].answer;
    console.log(`question -> answer working`);
    console.log(allCategoriesArr[questionId].clues[clueId].answer);
    let $selection = $(evt.target).closest(".question");
    $selection.addClass(`answer`);
    $selection.html(allCategoriesArr[questionId].clues[clueId].showing);
} else if (allCategoriesArr[questionId].clues[clueId].showing === allCategoriesArr[questionId].clues[clueId].answer){
   console.log(`last step`)
    return;
}

// allCategoriesArr[questionId].clues[clueId].showing = allCategoriesArr[questionId].clues[clueId].question;


//clean up code by assigned allcatarr etc to a shorter variable. Make it easier to read. 
});



/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */
let $spinner = $(`#spin-container`);
$startBtn.on("click", async function handleEpisodeClick(evt){
    if (gameState=== `off`){
        loadTableAndStart()
        
    } else if (gameState === `ongoing`){
        location.reload();
        
    }
    //add if logic - if table is full then reload game
    // console.log(`clicked`);
} )
function showLoadingView() {
    $spinner.show();

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
    $spinner.hide();
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupCategories() {
    await getCategoryIds();
    await allCategories(categories);
    // await getCategoryIds();
    // await allCategories(categories);
    // await fillTable(categories);
    
}

async function loadTableAndStart() {
    // await getCategoryIds();
    // await allCategories(categories);
    await fillTable(categories);
    gameState = 'ongoing';
    
}

function changeStartBtn(){
    $startBtn.html("Restart Game");
}

setupCategories()

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

// TODO

//1. Only load categories with questions that have length of 5. 
//2. Catch/ try if error load page again 

    // getCategoryIds();
    // allCategories(categories);
    // fillTable(categories);


//Further Study:
//how do I optimize the code? Create categories with IDs already in them?
//use IDs in data to access objects? 




//below code loops through each category, not sure if this is what I want
// async function fillTable([categories]) {
//     for (let category of categories){
//         console.log(`loop`);
//         // console.log(categories);
//         console.log(category);
//     }

// }





    

// async function fillTable(categories) {
//     let $table = $(`#jeopardy`);
    
//     }

// $(`#jeopardy`).on("click", async function handleClick(e){
//     // let target = $(e.target).closest(".question");
//     let target = $(e.target).closest(".question");
//     console.log(target);
//     //how do I access the object with an event click?
//     //access innerHTML somehow? and run logic to check if ob
// });

//  <td class="question" data-id="5-0">
// ${allCategoriesArr[5].showing}
// </td>