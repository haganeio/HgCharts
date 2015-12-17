var HgChart = function(options, data) {
  if(this instanceof HgChart) {
    this.options = options;

    if(data instanceof HgChartData) {
      this.data = data.nvd3Data;
    } else {
      this.data = data;
    }
  } else {
    return new HgChart(options, data);
  }
};

HgChart.prototype.setTitleVisibility = function(shouldDisplay) {
  this.options.title.enable = shouldDisplay;
};

HgChart.prototype.setTitle = function(title) {
  this.options.title.text = title;
};

HgChart.prototype.setSubtitleVisibility = function(shouldDisplay) {
  this.options.subtitle.enable = shouldDisplay;
};

HgChart.prototype.setSubtitle = function(subtitle) {
  this.options.subtitle.text = subtitle;
};




var HgLineChart = function(title, subtitle, margin, data) {
  //Check that the object calling the constructor is an istance of HgLineChart
  if(this instanceof HgLineChart) {
    var options = {
      chart: {
        type: 'lineChart',
        x: function(d){ return d.x; },
        y: function(d){ return d.y; },
        margin: margin
      },
      title: {
        enable: title != null,
        text: title,
        css: {
          'text-align' : 'inherit'
        }
      },
      subtitle: {
        enable: subtitle != null,
        text: subtitle,
        css: {
          'text-align' : 'inherit'
        }
      }
    };
    //Call parent constructor
    HgChart.call(this, options, data);
  } else {
    return new HgLineChart(title, subtitle, margin, data);
  }
};

//Set inheritance
HgLineChart.prototype = Object.create(HgChart.prototype);

//Set the constructor
HgLineChart.prototype.constructor = HgLineChart;




var HgPieChart = function(title, subtitle, margin, data){
  if(this instanceof HgPieChart) {
    var options = {
      chart: {
        type: 'pieChart',
        x: function(d){ return d.key; },
        y: function(d){ return d.cant; },
        margin: margin || {
          top: 5,
          right: 35,
          bottom: 5,
          left: 0
        },
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        showLabels: true
      },
      title: {
        enable: title != null,
        text: title,
        css: {
          'text-align' : 'inherit'
        }
      },
      subtitle: {
        enable: subtitle != null,
        text: subtitle,
        css: {
          'text-align' : 'inherit'
        }
      }
    };

    if(data instanceof HgChartData) {
      data = data.nvd3Data[0].values;
    }

    //Call parent constructor
    HgChart.call(this, options, data);
  } else {
    return new HgPieChart(title, subtitle, margin, data);
  }
};

//Set inheritance
HgPieChart.prototype = Object.create(HgChart.prototype);

//Set the constructor
HgPieChart.prototype.constructor = HgLineChart;

HgPieChart.prototype.setLabelsVisibility = function(shouldDisplay) {
  this.options.chart.showLabels = shouldDisplay;
};



var HgChartData = function(nvd3Data) {
  if(this instanceof HgChartData) {
    this.nvd3Data = nvd3Data || [];
  } else {
    return new HgChartData();
  }
};

HgChartData.prototype.addSeries = function(key, values, color, cssClass) {
  this.nvd3Data.push({
    values: values,
    key: key,
    color: color,
    class: cssClass
  });
};

HgChartData.prototype.removeSeries = function(index) {
  this.nvd3Data.splice(index, 1);
}

HgChartData.prototype.getSeries = function(index) {
  return this.nvd3Data[index];
}
