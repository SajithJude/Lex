function addTableToChat() {
    const chatArea = document.getElementById('chatArea');
    const tableHTML = `
    <table>
    <thead>
        <tr>
            <th colspan="2">The Code of Criminal Procedure, 1973</th>
            <th colspan="2">The Bhartiya Nagarik Suraksha Sanhita, 2023</th>
        </tr>
        <tr>
            <th>Sec.</th>
            <th>Heading</th>
            <th>Sec.</th>
            <th>Heading</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Short title, extent and commencement</td>
            <td>1</td>
            <td>Short title, extent and commencement</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Definitions</td>
            <td>2</td>
            <td>Definitions</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Construction of references</td>
            <td>3</td>
            <td>Construction of references</td>
        </tr>
        <tr>
            <td>4</td>
            <td>Trial of offences under the Indian Penal Code and other laws</td>
            <td>4</td>
            <td>Trial of offences under Bharatiya Nyaya Sanhita, 2023 and other laws</td>
        </tr>
        <tr>
            <td>5</td>
            <td>Saving</td>
            <td>5</td>
            <td>Saving</td>
        </tr>
        <!-- Continuing from where we left off above -->

        <!-- ... more rows ... -->
        <tr>
            <td>6</td>
            <td>Classes of Criminal Courts</td>
            <td>6</td>
            <td>Classes of Criminal Courts</td>
        </tr>
        <tr>
            <td>7</td>
            <td>Territorial divisions</td>
            <td>7</td>
            <td>Territorial divisions</td>
        </tr>
        <tr>
            <td>9</td>
            <td>Court of Session</td>
            <td>8</td>
            <td>Court of Session</td>
        </tr>
        <tr>
            <td>11</td>
            <td>Courts of Judicial Magistrates</td>
            <td>9</td>
            <td>Courts of Judicial Magistrates</td>
        </tr>
        <tr>
            <td>12</td>
            <td>Chief Judicial Magistrate and Additional Chief Judicial Magistrate, etc.</td>
            <td>10</td>
            <td>Chief Judicial Magistrate and Additional Chief Judicial Magistrate, etc.</td>
        </tr>
        <tr>
            <td>13</td>
            <td>Special Judicial Magistrates</td>
            <td>11</td>
            <td>Special Judicial Magistrates</td>
        </tr>
        <tr>
            <td>14</td>
            <td>Local jurisdiction of Judicial Magistrates</td>
            <td>12</td>
            <td>Local jurisdiction of Judicial Magistrates</td>
        </tr>
        <tr>
            <td>15</td>
            <td>Subordination of Judicial Magistrates</td>
            <td>13</td>
            <td>Subordination of Judicial Magistrates</td>
        </tr>
        <tr>
            <td>20</td>
            <td>Executive Magistrates</td>
            <td>14</td>
            <td>Executive Magistrates</td>
        </tr>
        <tr>
            <td>21</td>
            <td>Special Executive Magistrates</td>
            <td>15</td>
            <td>Special Executive Magistsates</td>
        </tr>
        <tr>
            <td>22</td>
            <td>Local jurisdiction of Executive Magistrates</td>
            <td>16</td>
            <td>Local jurisdiction of Executive Magistrates</td>
        </tr>
        <tr>
            <td>23</td>
            <td>Subordination of Executive Magistrates</td>
            <td>17</td>
            <td>Subordination of Executive Magistrates</td>
        </tr>
        <tr>
            <td>24</td>
            <td>Public Prosecutors</td>
            <td>18</td>
            <td>Public Prosecutors</td>
        </tr>
        <tr>
            <td>25</td>
            <td>Assistant Public Prosecutors</td>
            <td>19</td>
            <td>Assistant Public Prosecutors</td>
        </tr>
        <tr>
            <td>25A</td>
            <td>Directorate of Prosecution</td>
            <td>20</td>
            <td>Directorate of Prosecution</td>
        </tr>
        <tr>
            <td>26</td>
            <td>Courts by which offences are triable</td>
            <td>21</td>
            <td>Courts by which offences are triable</td>
        </tr>
        <tr>
            <td>28</td>
            <td>Sentences which High Courts and Sessions Judges may Pass</td>
            <td>22</td>
            <td>Sentences which High Courts and Sessions Judges may Pass</td>
        </tr>
        <tr>
            <td>29</td>
            <td>Sentences which Magistrates may pass</td>
            <td>23</td>
            <td>Sentences which Magistrates may pass</td>
        </tr>
        <tr>
            <td>30</td>
            <td>Sentence of imprisonment in default of fine</td>
            <td>24</td>
            <td>Sentence of imprisonment in default of fine</td>
        </tr>
       
        <!-- ... previous rows ... -->
        <tr>
            <td>31</td>
            <td>Sentence in cases of conviction of several offences at one trial</td>
            <td>25</td>
            <td>Sentence in cases of conviction of several offences at one trial</td>
        </tr>
        <tr>
            <td>32</td>
            <td>Mode of conferring powers</td>
            <td>26</td>
            <td>Mode of conferring powers</td>
        </tr>
        <tr>
            <td>33</td>
            <td>Powers of officers appointed</td>
            <td>27</td>
            <td>Powers of officers appointed</td>
        </tr>
        <tr>
            <td>34</td>
            <td>Withdrawal of powers</td>
            <td>28</td>
            <td>Withdrawal of powers</td>
        </tr>
        <tr>
            <td>35</td>
            <td>Powers of Judges and Magistrates exercisable by their successors-in-office</td>
            <td>29</td>
            <td>Powers of Judges and Magistrates exercisable by their successors-in-office</td>
        </tr>
        <tr>
            <td>36</td>
            <td>Powers of superior officers of police</td>
            <td>30</td>
            <td>Powers of superior officers of police</td>
        </tr>
        <tr>
            <td>37</td>
            <td>Public when to assist Magistrates and police</td>
            <td>31</td>
            <td>Public when to assist Magistrates and police</td>
        </tr>
        <tr>
            <td>38</td>
            <td>Aid to person, other than police officer, executing warrant</td>
            <td>32</td>
            <td>Aid to person, other than police officer, executing warrant</td>
        </tr>
        <tr>
            <td>39</td>
            <td>Public to give information of certain offences</td>
            <td>33</td>
            <td>Public to give information of certain offences</td>
        </tr>
        <tr>
            <td>40</td>
            <td>Duty of officers employed in connection with the affairs of a village to make certain report</td>
            <td>34</td>
            <td>Duty of officers employed in connection with the affairs of a village to make certain report</td>
        </tr>
        <tr>
            <td>41</td>
            <td>When police may arrest without warrant</td>
            <td>35</td>
            <td>When police may arrest without warrant</td>
        </tr>
        <tr>
            <td>41A</td>
            <td>Notice of appearance before police officer</td>
            <td>35</td>
            <td>When police may arrest without warrant (continued)</td>
        </tr>
        <tr>
            <td>41B</td>
            <td>Procedure of arrest and duties of officer making arrest</td>
            <td>36</td>
            <td>Procedure of arrest and duties of officer making arrest</td>
        </tr>
        <tr>
            <td>41D</td>
            <td>Right of arrested person to meet an advocate of his choice during interrogation</td>
            <td>38</td>
            <td>Right of arrested person to meet an advocate of his choice during interrogation</td>
        </tr>
        <tr>
            <td>42</td>
            <td>Arrest on refusal to give name and residence</td>
            <td>39</td>
            <td>Arrest on refusal to give name and residence</td>
        </tr>
        <tr>
            <td>43</td>
            <td>Arrest by private person and procedure on such arrest</td>
            <td>40</td>
            <td>Arrest by private person and procedure on such arrest</td>
        </tr>
        <tr>
            <td>44</td>
            <td>Arrest by Magistrate</td>
            <td>41</td>
            <td>Arrest by Magistrate</td>
        </tr>
    </tbody>
</table>

    `;
    // Append the table HTML to the chat area
    chatArea.innerHTML += tableHTML;
}


function highlightSectionAndQuery(sectionNumber) {

    addTableToChat();

    // // Remove existing highlights
    // document.querySelectorAll('#sectionTable tbody tr').forEach(row => {
    //     row.classList.remove('highlight');
    // });

    // Highlight the new row and get the BNSS heading
    let bnssHeading = '';
    document.querySelectorAll('#sectionTable tbody tr').forEach(row => {

        console.log(row.firstChild.textConten, sectionNumber)
        if (row.firstChild.textContent === sectionNumber) {
            row.classList.add('highlight'); // Add class to highlight the row
            bnssHeading = row.lastChild.textContent; // Get the BNSS heading
        }
    });

    // Check if a heading was found
    if (bnssHeading) {
        // Display the BNSS heading in the chat
        displayResult(bnssHeading);

        // Send the BNSS heading to the backend for further processing
        queryIPCSection(bnssHeading); // Reuse the function from previous instructions
    } else {
        // Handle case where the section number does not exist
        displayResult("Section number does not exist.");
    }
}



// document.getElementById("findButton").addEventListener("click", function() {
//     var initialMessage = document.getElementById("initialMessage");
//     if(initialMessage) {
//         initialMessage.style.display = "none"; // Hide the initial message
//     }


//     var ipcSection = document.getElementById("ipcSectionInput").value;

//     highlightSectionAndQuery(ipcSection);
//     // queryIPCSection(ipcSection); // Function to handle the search and display logic
//     document.getElementById("inputContainer").style.display = "flex";
// });

// function queryIPCSection(ipcSectionNumber) {
//     // Construct the POST request with the IPC section number
//     fetch('/findIPC', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ ipc_section: ipcSectionNumber })
//     })
//     .then(response => {
//         // Check if the request was successful
//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }
//         return response.json(); // Parse the JSON in the response
//     })
//     // .then(data => {
//     //     // Handle the response data
//         // displayResults(data);
//     // })
//     .catch(error => {
//         // Handle any errors
//         console.error('There has been a problem with your fetch operation:', error);
//     });
// }


// function displayResult(ipcSection) {
//     var chatArea = document.getElementById("chatArea");
//     // Simulate fetching search results here
//     var resultContent = `Results for IPC Section: ${ipcSection}`;
//     // Append results as a new div to chatArea
//     var resultDiv = document.createElement("div");
//     resultDiv.classList.add("reply-message"); // Use reply-message styling
//     resultDiv.innerHTML = resultContent;
//     chatArea.appendChild(resultDiv);
//     // Automatically scroll to the bottom of the chat area to show the latest result
//     chatArea.scrollTop = chatArea.scrollHeight;
// }


