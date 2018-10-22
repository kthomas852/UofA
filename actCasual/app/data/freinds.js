//Applicaiton storage as an array of objects

function Actor(fName, lName, age, photo, survey){
    fName: fName;
    lName: lName;
    age: age;
    photo: photo;
    survey: survey
}

//Array that stores all members
members = [];

//If both members agree to match then they will be placed in this array
couples = [];

//getsum function
function getSum(total, num){
    return total + num;
};

//Coupling function
function coupling(mem1, mem2){
    let compatibilityArray = [];
    for(i=0; i<mem1.length; i++){
        let dif = 0;
        if(mem1.survey[i] > mem2.survey[i]){
            dif = mem1.survey[i] - mem2.survey[i];
        }else{
            dif = mem2.survey[i] - mem1.survey[i]
        }
        compatibilityArray.push(dif);
    }
    return compatibilityArray.reduce(getSum);
}