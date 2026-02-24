
export const users = [
  { username: "cust1", password: "123" },
  { username: "cust2", password: "123" },
  { username: "cust3", password: "123" },
  { username: "cust4", password: "123" },
  { username: "cust5", password: "123" }
];
export const staff = [
 { username: "staff1", password: "123" },
  { username: "staff2", password: "123" },
  { username: "staff3", password: "123" },
  { username: "staff4", password: "123" },
  { username: "staff5", password: "123" }
]

export const setLocalStorage = (username,password)=>{
    
    localStorage.setItem("users",JSON.stringify(users)); 
    localStorage.setItem("staff",JSON.stringify(staff)); 
}

export const getLocalStorage =()=> {
   const customer = JSON.parse(localStorage.getItem("users"));
   const staff = JSON.parse(localStorage.getItem("staff"));

    return {customer, staff};
}