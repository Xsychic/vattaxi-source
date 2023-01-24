class MapTransformations {
    chartLastPosition = false;
    chartFrame;
    chart;
    scale = 0.6;
    zoomSpeed = 0.1;
    initialY = 0;
    initialX = 0;
    
    constructor(cFrame, crt) {
        this.chartFrame = cFrame;
        this.chart = crt;
    }
    
    initMap = () => {
        const chartWidth = this.chart.children[0].width * this.scale;
        const frameWidth = this.chartFrame.offsetWidth;
        const widthMargin = Math.max(5 * (chartWidth - frameWidth) / 8, 0);
    
        const chartHeight = this.chart.children[0].height * this.scale;
        const frameHeight = this.chartFrame.offsetHeight;
        const heightMargin = Math.max(2 * (chartHeight - frameHeight) / 5, 0);
    
        // scale map
        this.chart.style.transform = `scale(${( this.scale )})`;
    
        this.initialX = -1 * widthMargin;
        this.initialY = -1 * heightMargin;
    
        this.chart.style.top = `${ -1 * heightMargin }px`;
        this.chart.style.left = `${ -1 * widthMargin }px`;
    }
    
    drag = (event) => {
        // image panning/drag event handler
    
        if(!this.chartLastPosition) {
            this.chartLastPosition = event;
            return;
        }
    
        if(event.x == 0 && event.y == 0)
            return;
    
        // calculate translation on x axis
        let currentLeft = this.chart.style.left || `${ this.initialX }px`;
        currentLeft = parseInt(currentLeft.replace('px', ''));
        const xDifference = event.screenX - this.chartLastPosition.screenX;
        let newLeft = currentLeft + xDifference;
    
        // calculate translation on y axis
        let currentTop = this.chart.style.top || `${ this.initialY }px`;
        currentTop = parseInt(currentTop.replace('px', ''));
        const yDifference = event.screenY - this.chartLastPosition.screenY;
        let newTop = currentTop + yDifference;
    
        // bound checks and translate
        this.translateMap(newLeft, newTop, event.target);
    
        this.chartLastPosition = event;
    
    }
    
    dragEnd = (event) => {
        this.drag(event)
        this.chartLastPosition = false;
    }
    
    zoom = (direction) => {
        // function to implement zoom on map
    
        // rate of change is the zoomSpeed as a proportion
        // x/yDiff is the amount that the visible part of the map is squashed/stretched to update the margin with as well
        let rateOfChange, xDiff = this.chartFrame.offsetWidth, yDiff = this.chartFrame.offsetHeight;
        
        if(direction == 'in') {
            rateOfChange = 1 + this.zoomSpeed;
            xDiff = 0 - xDiff / 2 * this.zoomSpeed;
            yDiff = 0 - yDiff / 2 * this.zoomSpeed;
        } else if(direction == 'out') {
            rateOfChange = 1 - this.zoomSpeed; 
            xDiff = xDiff / 2 * this.zoomSpeed;
            yDiff = yDiff / 2 * this.zoomSpeed;
        }
        
        // zoom bound checks
        let newWidth = this.chart.children[0].offsetWidth * (this.scale * rateOfChange); 
        let newHeight = this.chart.children[0].offsetHeight * (this.scale * rateOfChange); 

        // exit function if zooming out and it would cause map to be smaller than chartFrame
        if(direction == 'out' && (newWidth <= this.chartFrame.offsetWidth || newHeight <= this.chartFrame.offsetHeight)) {
            return;
        }
    
        // exit function if zooming in and scale would be more than 6
        if(direction == 'in' && this.scale * rateOfChange > 6) {
            return;
        }
    
        // scale map
        this.chart.style.transform = `scale(${( this.scale *= rateOfChange )})`;
    
        let top = this.chart.style.top || `${ this.initialY }px`;
        top = parseInt(top.replace('px', '')) * rateOfChange + yDiff;
    
        let left = this.chart.style.left || `${ this.initialX }px`;
        left = parseInt(left.replace('px', '')) * rateOfChange + xDiff;
    
        // enforce bound checks and then translate map
        this.translateMap(left, top, this.chart.children[0])
    }
    
    translateMap = (newLeft, newTop, element) => {
        // x bound checks
        if(newLeft > 0)
            newLeft = 0;
    
        const minLeft = -1 * (element.width * this.scale - this.chartFrame.clientWidth);
    
        if(newLeft < minLeft)
            newLeft = minLeft;
    
        // y bound checks
        if(newTop > 0) 
            newTop = 0;
    
        const minTop = -1 * (element.height * this.scale - this.chartFrame.clientHeight);
    
        if(newTop < minTop)
            newTop = minTop;
    
        // translate
        newLeft = `${ newLeft }px`;
        this.chart.style.left = newLeft;
        newTop = `${ newTop }px`;
        this.chart.style.top = newTop;
    }
}



export default MapTransformations;