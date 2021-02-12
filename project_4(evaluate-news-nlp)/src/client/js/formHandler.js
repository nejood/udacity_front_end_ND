function handleSubmit(event) {
    event.preventDefault();
    let article_url = document.getElementById('url').value
    // check what text was put into the form field
     if(Client.isURLValid(article_url)){
        console.log("::: Form Submitted :::")
         const post_URL = 'http://localhost:8081/add'
         postData(post_URL, {url: article_url})
         .then((res)=>{
            document.getElementById('polarity').innerHTML = `Polarity: ${res.score_tag}`;
            document.getElementById('agreement').innerHTML = `Agreement: ${res.agreement}`;
            document.getElementById('subjectivity').innerHTML = `Subjectivity: ${res.subjectivity}`;
            document.getElementById('confidence').innerHTML = `Confidence: ${res.confidence}`;
            document.getElementById('irony').innerHTML = `Irony: ${res.irony}`;
            
         })
      
     }else {
        alert('The entered URL is invalid, please try again with a valid URL');
    }

}

/* Function to POST data */
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
        'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify(data)
    });
    try {
     const newData = await response.json();
     console.log(newData);
     return newData;
      }catch(error) {
      console.log("error", error);
      }
};


export { handleSubmit }
