window.onload = function() {

    // Get the modal
    var modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modalImagePreview');
    modalContainer.setAttribute('class', 'modal');

    var imgModal = document.createElement('img');
    imgModal.setAttribute('id', 'imagePreview');
    imgModal.setAttribute('class', 'modal-content');

    modalContainer.appendChild(imgModal);

    // When the user clicks on <span> (x), close the modal
    modalContainer.onclick = function() {
        imgModal.className += " out";

        setTimeout(function() {
            imgModal.className = "modal-content";
            modalContainer.remove();
        }, 400);
    }    

    // Get the image and insert it inside the modal
    var img = document.querySelectorAll('img');
    // Give the event listener on all img
    for(var i = 0; i<img.length; i++) {
        img[i].onclick = function(){
            this.parentNode.insertBefore(modalContainer, this.nextSibling);
            modalContainer.classList.add('show');
            imgModal.src = this.src;
        }
    }


    var divSection = document.querySelectorAll('div .section');
    divSection.forEach( sectionElement => {
        var sectionHeight = sectionElement.clientHeight;
        var anchorOfHeader = sectionElement.querySelectorAll('a.headerlink')[0];

        var heading = anchorOfHeader.parentElement;

        // make sure for creating the text side from h2-h6
        if(heading.tagName !== 'H1') {
            var headingText = heading.innerText;

            var leftSpanTextId = "left-span-text-"+sectionElement.id;
            createSpanText(sectionElement, leftSpanTextId, headingText, ["span-text", "left-span-text"]);

            var leftSpanTextSpanEl = document.getElementById(leftSpanTextId);

            // if the element is short from the span text, it will not appear
            if(sectionElement.clientHeight > leftSpanTextSpanEl.clientWidth) {
                var leftSectionWrapperId = "wrapper-left-side-"+sectionElement.id;
                createWrapper(sectionElement, anchorOfHeader, leftSectionWrapperId, sectionHeight, ["section-wrapper", "left-section-wrapper"]);

                var leftSectionWrapperObj = document.getElementById(leftSectionWrapperId);
                calculateSpanTextPositionAndAddEventListener(leftSectionWrapperObj, leftSpanTextSpanEl, sectionElement);
            }

            var rightSpanTextId = "right-span-text-"+sectionElement.id;
            createSpanText(sectionElement, rightSpanTextId, headingText, ["span-text", "right-span-text"]);

            var rightTextSpanEl = document.getElementById(rightSpanTextId);

            // if the element is short from the span text, it will not appear
            if(sectionElement.clientHeight > rightTextSpanEl.clientWidth) {
                var rightSectionWrapperId = "wrapper-right-side-"+sectionElement.id;
                createWrapper(sectionElement, anchorOfHeader, rightSectionWrapperId, sectionHeight, ["section-wrapper", "right-section-wrapper"]);

                var rightSectionWrapperObj = document.getElementById(rightSectionWrapperId);
                calculateSpanTextPositionAndAddEventListener(rightSectionWrapperObj, rightTextSpanEl, sectionElement);
            }
        }
    });
    
    function createSpanText(parentElement, spanTextId, headingText, arrClassLists) {
        var spanText = document.createElement('span');
        spanText.id = spanTextId;
        arrClassLists.forEach(function(val) {
            spanText.classList.add(val);
        });
        spanText.textContent = headingText;

        parentElement.insertBefore(spanText, parentElement.firstChild);
    }


    function createWrapper(parentElement, anchor, sectionWrapperId, sectionWrapperHeight, arrClassLists) {
        var sectionWrapper = document.createElement('div');
        sectionWrapper.id = sectionWrapperId;
        arrClassLists.forEach(function(val) {
            sectionWrapper.classList.add(val);
        });
        sectionWrapper.style.height = sectionWrapperHeight+"px";
        sectionWrapper.addEventListener("click", function() {
            var url = location.href;               //Save down the URL without hash.
            location.href = anchor.href;                 //Go to the target element.
            history.replaceState(null,null,url);   //Don't like hashes. Changing it back.    
        });

        parentElement.insertBefore(sectionWrapper, parentElement.firstChild);
    }


    function calculateSpanTextPositionAndAddEventListener(sectionWrapperEl, spanTextEl, sectionElement) {
        var totalWrapperTextSpanVertical = sectionWrapperEl.clientHeight;
        var totalTextSpanVertical = spanTextEl.clientWidth;
        var halfOfTextSpan = Math.floor(totalTextSpanVertical/2);
    
        var topLimitForHalfTextSpan = halfOfTextSpan; //for r<topLimitForHalfTextSpan = nempelAtas
        var bottomLimitForHalfTextSpan = totalWrapperTextSpanVertical - totalTextSpanVertical;
    
        sectionWrapperEl.addEventListener("mousemove", function(event) {
            var rect = event.target.getBoundingClientRect();
            var x = event.clientX - rect.left; //x position within the element.
            var y = event.clientY - rect.top;  //y position within the element.
    
            if(y < topLimitForHalfTextSpan) {
                var xy = totalWrapperTextSpanVertical - (y+totalTextSpanVertical);
                spanTextEl.style.top = y+totalTextSpanVertical+"px";
            }
            else if(y > topLimitForHalfTextSpan && y < bottomLimitForHalfTextSpan) {
                spanTextEl.style.top = (y + halfOfTextSpan)+"px";
            } 
            else if(y > bottomLimitForHalfTextSpan) {
                spanTextEl.style.top = (y + 0)+"px";
            }
            
            spanTextEl.style.visibility = 'visible';
            sectionElement.classList.add('active');
        });
    
    
        sectionWrapperEl.addEventListener('mouseleave', (event) => {
            spanTextEl.style.visibility='hidden';
            sectionElement.classList.remove('active');
        });    
    }



}