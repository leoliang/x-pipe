services.service('MigrationService', ['$resource', '$q', function($resource, $q) {
	var resource = $resource('', {}, {
		create_event: {
			method : 'POST',
			url : '/console/migration/events'
		},
		find_all: {
			method : 'GET',
			url : '/console/migration/events/all',
			isArray : true
		},
		find_event_details: {
			method : 'GET',
			url : '/console/migration/events/:eventId',
			isArray : true
		},
		find_migration_shard: {
			method : 'GET',
			url : '/console/migration/events/:eventId/clusters/:clusterId/shards/:shardId'
		}
	});

	function createEvent(migrationClusters) {
		var d = $q.defer();
		resource.create_event({},
				{
					event : {
						migrationClusters : migrationClusters
					}
				},
			function(result) {
				d.resolve(result);
			},
			function(result) {
				d.reject(result);
			});
		return d.promise;
	}

	function findAll() {
		var d = $q.defer();
		resource.find_all({},
			function(result) {
				d.resolve(result);
			},
			function(result) {
				d.reject(result);
			});
		return d.promise;
	}

	function findEventDetails(eventId) {
		var d = $q.defer();
		resource.find_event_details(
			{
				eventId : eventId
			},
			function(result) {
				d.resolve(result);
			},
			function(result) {
				d.reject(result);
			});
		return d.promise;
	}

	return {
		createEvent : createEvent,
		findAll : findAll,
		findEventDetails : findEventDetails
	}
}]);