import { allNav } from "./allNav";
export const getNav = (role) => {
    const finalNavs = [];
    for (let index = 0; index < allNav.length; index++) {
        if(role === allNav[index].role){
            finalNavs.push(allNav[index]);
        }        
    }
    return finalNavs;
}