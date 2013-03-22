var _ = require('underscore');
var util = require('util');

var _DEBUG = false;

module.exports = function (item, cb) {
	this.index_record(item);

	var id = this.as_id(item);

	if(this._index[id]){
		delete this._index[id];
	}

	var pk = this._pk;

	this.data = _.reject(this.data, function(record){
		return record[pk] == id;
	}) ;

	if (_DEBUG) console.log('inserting item %s into model %s of dataspace %s, after insertion, _index == %s',
		util.inspect(item), this.name, this.get_config('dataspace').component_id, util.inspect(this._index));

	this.data.push(item);
	if (cb) cb(null, item);
	this.emit('record', item);

	return item;
}