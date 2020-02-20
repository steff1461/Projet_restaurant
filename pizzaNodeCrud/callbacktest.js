function test1() {
    alert('test 1');
}

function test2() {
    alert('test 2');
}
// function callback
function test(fct_retour) {
    fct_retour(); // call callback
}

//L' exemple ci-dessus est un rappel synchrone et il est exécuté immédiatement.
test(test2());
test(test1());

test( function() { alert('Hello'); } );