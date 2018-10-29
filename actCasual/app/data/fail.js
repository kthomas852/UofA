//Applicaiton storage as an array of objects
export function Actor(fName, lName, age, photo, survey){
    this.fName = fName;
    this.lName = lName;
    this.age = age;
    this.photo = photo;
    this.survey = survey
}

//Array that stores all members
export var members = [];

//If both members agree to match then they will be placed in this array
export var couples = [];

//getsum function
export function getSum(total, num){
    return total + num;
};

//Coupling function
export function coupling(mem1, mem2){
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
};