var FormattedNumber = ReactIntl.FormattedNumber;

var SellerForm = React.createClass({
	render: function(){
		return (
			<div className='jumbotron'>
				<h2>Extreme Carpaccio - Single Player Mode</h2>
				<p>Server is running in single-player mode. Client should be running on localhost:9000.</p>
				<p>Score tracking and graph display are active below.</p>
			</div>
		);
	}
});

var SellerView = React.createClass({
	getInitialState: function() {
		return {data: {}};
	},
	string2Color: function(str) {
		var hash = 0;

		for (var i = 0; i < str.length; i++) {
			hash = str.charCodeAt(i) + ((hash << 5) - hash);
		}

		var color = "#";

		for (var j = 0; j < 3; j++) {
			color += ("00" + ((hash >> j * 8) & 0xFF).toString(16)).slice(-2);
		}

		return color;
	},
	formatChartData: function(data) {
		var chartData = {};
		var labels = [];
		var datasets = [];
		if(data && !_.isEmpty(data.history)) {
			var seller;
			for (seller in data.history) {
				var color = this.string2Color(seller);
				datasets.push({
					label: seller,
					fillColor: "transparent",
					strokeColor: color,
					pointColor: color,
					pointStrokeColor: "#fff",
					pointHighlightFill: "#000",
					pointHighlightStroke: color,
					data: _.takeRight(data.history[seller], 10)
				});
			}

			var lastIteration = data.lastIteration;
			for(var i = 0; i < lastIteration; i += 10) {
				labels.push(i + "");
			}
		}else  {
			return undefined;
		}

		chartData['datasets'] = datasets;
		chartData['labels'] = _.takeRight(labels, 10);
		return chartData;
	},
	componentDidMount: function() {
		var ctx = document.getElementById("salesChart").getContext("2d");
		var chart = new Chart(ctx);
		this.setState({chart: chart});
	},
	componentWillReceiveProps: function() {
		var history = this.formatChartData(this.props.salesHistory);
		this.setState({salesHistory: history});
	},
	refreshChart: function() {
		if(this.state.chart && this.state.salesHistory) {
			var chart = this.state.chart;
			var noAnimation = {
				bezierCurve: false,
				animation: false
			};
			chart.Line(this.state.salesHistory, noAnimation);
		}
	},
	render: function(){
		this.refreshChart();
		var self = this;
		var playerData = this.props.data.length > 0 ? this.props.data[0] : null;
		var currentScore = playerData ? playerData.cash : 0;
		var playerStatus = playerData ? (playerData.online ? 'Online' : 'Offline') : 'Disconnected';
		var statusClass = playerData && playerData.online ? 'text-success' : 'text-danger';
		
		return (
			<div>
				<div className='row'>
					<div className='col-md-4'>
						<h2>Current Score</h2>
						<div className='well'>
							<h3>
								<FormattedNumber
									value={currentScore}
									style='currency'
									currency='EUR' />
							</h3>
							<p>Status: <span className={statusClass}><strong>{playerStatus}</strong></span></p>
						</div>
					</div>
					<div className='col-md-8'>
						<h2>Score History</h2>
						<canvas id="salesChart" width="730" height="400"></canvas>
					</div>
				</div>
				<hr/>
				<footer>
					<p>Have fun :D </p>
				</footer>
			</div>
		);
	}
});

var Seller = React.createClass({
	loadSellersFromServer: function(){
		$.ajax({
			url: '/sellers',
			datatype: 'json',
			success: function(data) {
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	getSalesHistory: function() {
		$.ajax({
			url: '/sellers/history?chunk=' + this.props.historyFrequency,
			datatype: 'json',
			success: function(data) {
				this.setState({salesHistory:data});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	// Seller registration disabled in single-player mode

	getInitialState: function(){
		return {data: []};
	},

	reloadSellersData: function() {
		this.loadSellersFromServer();
		this.getSalesHistory();
	},

	componentDidMount: function(){
		this.reloadSellersData();
		setInterval(this.reloadSellersData, this.props.pollInterval);
	},

	render: function(){
		return (
			<div className='container'>
				<SellerForm />
				<SellerView data={this.state.data} salesHistory={this.state.salesHistory} />
			</div>
		);
	}
});

React.render(
	<Seller url='/seller' pollInterval='5000' historyFrequency='10' />,
	document.getElementById('seller')
);

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
});
