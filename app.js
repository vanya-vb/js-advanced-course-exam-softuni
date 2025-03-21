window.addEventListener('load', solve);

function solve() {
    // Capture elements
    let firstNameElement = document.getElementById("first-name");
    let lastNameElement = document.getElementById("last-name");
    let fromDateElement = document.getElementById("from-date");
    let toDateElement = document.getElementById("to-date");

    let nextBtn = document.getElementById("next-btn");

    let vacationInfoContainer = document.querySelector(".info-list");
    let confirmVacationContainer = document.querySelector(".confirm-list");

    // Add event listener to the Next button
    nextBtn.addEventListener("click", onClick);

    function onClick(e) {
        e.preventDefault();

        // validate the input
        if (firstNameElement.value === '' ||
            lastNameElement.value === '' ||
            fromDateElement.value === '' ||
            toDateElement.value === '') {
            return;
        }

        // validate dates
        function isValidDate(date1, date2) {
            let startDate = new Date(date1);
            let endDate = new Date(date2);

            if (startDate < endDate) {
                return true;
            } else {
                return false;
            }
        }

        let isValid = isValidDate(fromDateElement.value, toDateElement.value);

        if (isValid == false) {
            return;
        }

        // create the given html structure
        let listElementInfo = document.createElement("li");
        listElementInfo.setAttribute("class", "vacation-content");

        let articleElementInfo = document.createElement("article");

        let name = document.createElement("p");
        name.textContent = `Name: ${firstNameElement.value} ${lastNameElement.value}`;

        let fromDate = document.createElement("p");
        fromDate.textContent = `From date: ${fromDateElement.value}`;

        let toDate = document.createElement("p");
        toDate.textContent = `To date: ${toDateElement.value}`;

        let editBtn = document.createElement("button");
        editBtn.setAttribute("class", "edit-btn");
        editBtn.textContent = 'Edit';

        let continueBtn = document.createElement("button");
        continueBtn.setAttribute("class", "continue-btn");
        continueBtn.textContent = 'Continue';

        // append
        articleElementInfo.appendChild(name);
        articleElementInfo.appendChild(fromDate);
        articleElementInfo.appendChild(toDate);

        listElementInfo.appendChild(articleElementInfo);
        listElementInfo.appendChild(editBtn);
        listElementInfo.appendChild(continueBtn);

        vacationInfoContainer.appendChild(listElementInfo);

        // save the input data for further usage
        let editedFirstNameElement = firstNameElement.value;
        let editedLastNameElement = lastNameElement.value;
        let editedFromDateElement = fromDateElement.value;
        let editedToDateElement = toDateElement.value;

        // clear the input data
        firstNameElement.value = '';
        lastNameElement.value = '';
        fromDateElement.value = '';
        toDateElement.value = '';

        // disable the Next button
        nextBtn.disabled = true;

        // Add event listener to the Edit button
        editBtn.addEventListener("click", onEdit);

        function onEdit() {
            // load the info back in the input fields
            firstNameElement.value = editedFirstNameElement;
            lastNameElement.value = editedLastNameElement;
            fromDateElement.value = editedFromDateElement;
            toDateElement.value = editedToDateElement;

            // remove the created preview
            listElementInfo.remove();

            // enable the next btn again
            nextBtn.disabled = false;
        }

        // Add event listener to the Continue btn
        continueBtn.addEventListener("click", onContinue);

        function onContinue() {
            let liElementContinue = document.createElement("li");
            liElementContinue.setAttribute("class", "vacation-content");

            let articleElementContinue = document.createElement("article");
            articleElementContinue = articleElementInfo;

            let confirmBtn = document.createElement("button");
            confirmBtn.setAttribute("class", "confirm-btn");
            confirmBtn.textContent = 'Confirm';

            let cancelBtn = document.createElement("button");
            cancelBtn.setAttribute("class", "cancel-btn");
            cancelBtn.textContent = 'Cancel';

            liElementContinue.appendChild(articleElementContinue);
            liElementContinue.appendChild(confirmBtn);
            liElementContinue.appendChild(cancelBtn);

            listElementInfo.remove();

            confirmVacationContainer.appendChild(liElementContinue);

            // Add event listener to the Confirm btn
            confirmBtn.addEventListener("click", onConfirm);

            function onConfirm() {
                liElementContinue.remove();

                // enable the next btn
                nextBtn.disabled = false;

                let statusElement = document.getElementById("status");
                statusElement.setAttribute("class", "vacation-confirmed");
                statusElement.textContent = 'Vacation Requested';

                statusElement.addEventListener("click", onReload);
            }

            // Add event listener to the Cancel btn
            cancelBtn.addEventListener("click", onCancel);

            function onCancel() {
                liElementContinue.remove();

                nextBtn.disabled = false;

                let statusElement = document.getElementById("status");
                statusElement.setAttribute("class", "vacation-cancelled");
                statusElement.textContent = 'Cancelled Vacation';

                statusElement.addEventListener("click", onReload);
            }

            function onReload() {
                window.location.reload();
            }
        }
    }
}




