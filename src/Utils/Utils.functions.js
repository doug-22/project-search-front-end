// eslint-disable-next-line
export default {
    formatFacets: (list) => {
        let array_facet = [];
        for(let i = 1; i <= list.length;) {
            if(list[i] === 0) {
              i += 2;
            }else {
              let newSubject = {
                title: list[i-1],
                amount: list[i]
              }
              array_facet.push(newSubject)
              i += 2
            } 
          }
        return array_facet;
    },
    formatDate: (date) => {
      let day = "" + date.getDate();
      let month = "" + (date.getMonth() + 1);
      let year = date.getFullYear();
  
      if(day.length < 2) day = "0" + day;
      if(month.length < 2) month = "0" + month;
  
      return [year, month, day].join("-");
    }
}