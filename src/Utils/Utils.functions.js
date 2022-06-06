import Api from "../Services/Api";

// eslint-disable-next-line
export default {
    formatFacets: (title, type,list) => {
        let object_facet = {
          facetTitle: title,
          facetType: type,
          data: []
        };
        for(let i = 1; i <= list.length;) {
            if(list[i] === 0) {
              i += 2;
            }else {
              let newObjectFacet = {
                title: list[i-1],
                amount: list[i]
              }
              object_facet.data.push(newObjectFacet)
              i += 2
            } 
          }
        return object_facet;
    },
    formatDate: (date) => {
      let day = "" + date.getDate();
      let month = "" + (date.getMonth() + 1);
      let year = date.getFullYear();
  
      if(day.length < 2) day = "0" + day;
      if(month.length < 2) month = "0" + month;
  
      return [year, month, day].join("-");
    },
    handleSubmitType: async (type, term, date, initialDate, finalDate) => {
      let newType = type === 'Campo específico' ? '' : type;
      if( newType.length === 0 && term.length !== 0 && date === false ) {
        let response = await Api.getSearch(term);
        return response;
      } else if ( newType.length !== 0 && term.length !== 0 && date === false ) {
        let response = await Api.getSpecificSearch(newType, term);
        return response;
      } else if ( newType.length !== 0 && term.length !== 0 && date === true ) {
        let response = await Api.getSpecificSearchTimeRange(newType, term, initialDate, finalDate);
        return response;
      } else if (newType.length === 0 && term.length !== 0 & date === true) {
        let response = await Api.getSearchTimeRange(term, initialDate, finalDate);
        return response;
      }
    },
    handleHighlightingDescription: (name, highlighting, description) => {
      let newDescription = '';
      if(highlighting) {
        Object.keys(highlighting).forEach(function(item){
          if(name === item){
            const descriptionContext = highlighting[item];
            if(descriptionContext.data_file) {
              descriptionContext.data_file.map((item) => {
                newDescription += '...' + item
                return newDescription;
              });
            } else {
              newDescription = description;
            }
          }
         });
      } else {
        newDescription = description;
      }
      return newDescription
    }
}