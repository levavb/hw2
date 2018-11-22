

$(".SecondPage").hide();
$("#FinishButton").hide();
$(".TopPage").hide();
var category, type, dataOfQuestion, NumCorrect, NumQuestion;

$(document).ready(function () {
    $("#StartButton").click(function () {
        getCategory();
        if ((category == "any") || (type == "any"))
            return;
        NumCorrect = 0;
        NumQuestion = 0;
        $(".MainPage").hide();
        $("#Points").html(0);
        $(".TopPage").show();
        $("#QuestionArea").html(" Question Number 1:");
        printQuestionAndAnswers();
        $(document).ajaxComplete(function () { 
            $("#FinishButton").show();
        })
    })
    $("#FinishButton").click(function () {

        $("#FinishButton").hide();
        $(".TopPage").hide();
        $(".SecondPage").hide();
        $(".MainPage").show();
        $("#StartButton").show();
        $("#Category").val("any");
        $("#Type").val("any");
        alert("Game Over. you collect " +( NumCorrect * 5 )+ " points");
    })
    $(".multipleButton").click(function () {
        var value = this.value;
        if (value == 3) {
            this.style.backgroundColor = "green";
            NumCorrect++;
            $("#Points").html(NumCorrect * 5);
        } else {
            this.style.backgroundColor = "red";
        }
        printQuestionAndAnswers();

    })
    $(".booleanButton").click(function () {
        var value = this.value;
        if (dataOfQuestion.results[0].correct_answer == value) {
            this.style.backgroundColor = "green";
            NumCorrect++;
            $("#Points").html(NumCorrect*5);
        } else {
            this.style.backgroundColor = "red";
        }
        printQuestionAndAnswers();
    })
})

function printQuestionAndAnswers() {
 
    if (NumCorrect <= 5) {
        getQuestion(category, type, "easy");
    }
    if ((NumCorrect > 5) && (NumCorrect <= 10)) {
        getQuestion(category, type, "medium");
    }
    if (NumCorrect > 10) {
        getQuestion(category, type, "hard");
    }

    $(document).ajaxComplete(function () {
        $("#QuestionArea").html(" Question Number " + NumQuestion + ":" + "<br>" + dataOfQuestion.results[0].question);
 
        if (type == "multiple") {
            $(".multipleButton").show();
            $(".multipleButton").css({ "background-color": "WhiteSmoke" });
            var order = getOrderOfAnswer();
            for (i = 0; i < 4 ; i++) {
                if (order[i] == 3) {
                    $("#button" + i).html(dataOfQuestion.results[0].correct_answer);
                } else {
                    $("#button" + i).html(dataOfQuestion.results[0].incorrect_answers[order[i]]);
                }
                $("#button" + i).val(order[i]);
            }
        } else {
            $(".booleanButton").show();
            $(".booleanButton").css({ "background-color": "WhiteSmoke" });
        }
    });
}

function getQuestion(cat, type, difficult) {

    var urlQuest = "https://opentdb.com/api.php?amount=1&category=" + cat + "&difficulty=" + difficult + "&type=" + type;
    $.ajax({
        url: urlQuest,
        type: "get",
        success: function (data) {
            dataOfQuestion = data;
        }
    })
    NumQuestion++;
}

function getCategory() {
    category = $("#Category").val();
    type = $("#Type").val();
}

function getOrderOfAnswer() {
    var array = new Array(4);
    var x;
    for (var i = 0; i < 4;) {
        x = Math.floor((Math.random() * 4));
        for (var j = 0; j <= i; j++) {
            if (j == i) {
                array[j] = x;
                i++;
                break;
            } else if (array[j] == x) {
                break;
            } 
        }
    }
    return array;
}

