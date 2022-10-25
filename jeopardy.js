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

//declare variables
let categories = [];
let allCategoriesArr = [];
let catObj = [];
let count = 0;
let $startBtn = $(`#start`)
let gameState = `off`;
let $spinner = $(`#spin-container`);


/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */


//retreive ID numbers from jservice api 
// retreive 100 categories and select 6 randomly
async function getCategoryIds() {
categories = [];
tempCats = [];
let response = await axios.get(`https://jservice.io/api/categories`, {params: {count:100}});
response.data.map(el=>{
    tempCats.push(el.id);
})
let randomCats= _.sampleSize(tempCats, 6);
categories.push(randomCats);
return categories;
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
let tempObj = {}
tempObj.title= response.data.title;
tempObj.clues = response.data.clues.map(el=>({
question: el.question,
answer: el.answer,
showing: `?`,
}));

if (tempObj.clues.length <5){
    location.reload();
 }
return tempObj;
}

//for each category ID, run through getCategory function to retreive clues
async function allCategories([categories]){
    for (let category of categories){
    let tempObj= await getCategory(category);
    allCategoriesArr.push(tempObj);
    }
    //show start button only if all categories succesfully load as this is the last function
    //in the function chain
    $startBtn.show();
    hideLoadingView();

}

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



$(`#jeopardy`).on("click", function handleClick(evt){
let questionId = $(evt.target).closest(".question").data("question-id");
let clueId = $(evt.target).closest(".question").data("clues-id");
const question = allCategoriesArr[questionId].clues[clueId];
//if showing is ? set to clue question
if (question.showing === `?`){
    question.showing = question.question;
    let $selection = $(evt.target).closest(".question");
    $selection.addClass(`text-question`);
    $selection.html(question.showing);
} 
else if (question.showing === question.question){
    question.showing = question.answer;
    let $selection = $(evt.target).closest(".question");
    $selection.addClass(`answer`);
    $selection.html(question.showing);
} else if (question.showing === question.answer){
   console.log(`last step`)
    return;
} 
});



/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */


$startBtn.on("click", async function handleEpisodeClick(evt){
    if (gameState=== `off`){
        loadTableAndStart()
    } else if (gameState === `ongoing`){
        location.reload();
    }
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

// upon page loading, run this function
// get categories from API that have valid clues
async function setupCategories() {
    await getCategoryIds();
    await allCategories(categories);    
}

// input categories into HTML table and update game state which effects start button logic
async function loadTableAndStart() {
    await fillTable(categories);
    gameState = 'ongoing';
}

// change text of start button
function changeStartBtn(){
    $startBtn.html("Restart Game");
}

//start loading categories as soon as page loads
setupCategories()

// TODO
// personal further improvement:
//dynamically create table & ids instead of static table
//make table look better
//replace single object with missing clues instead of refreshing all 6 categories
//possibly replace the faulty category id # in the array