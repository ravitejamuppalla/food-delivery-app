import { toast } from "react-toastify";
export let generateSomeRandomObjectInArrayList = (arraylist, count) => {
  let finalArrayList = [];
  for (let i = 0; i < count; i++) {
    let randomNumber = Math.floor(Math.random() * arraylist.length);
    finalArrayList.push(arraylist[randomNumber]);
  }

  return finalArrayList;
};
export let SucessMessageTroster = (Message, Seconds = 1000) => {
  toast.success(Message, {
    position: "top-right",
    autoClose: Seconds,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};

export let ErrorMessageTroster = (Message, Seconds) => {
  toast.error(Message, {
    position: "top-right",
    autoClose: Seconds,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
