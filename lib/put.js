var _ = require('underscore');
var util = require('util');

var _DEBUG = false;

module.exports = function (item, cb) {

	var id = this.as_id(item);
///	console.log('id of item %s is %s', util.inspect(item), id);

	var pk = this._pk;

	if (id){
		if(this._index[id]){
			delete this._index[id];
		}


		this.data = _.reject(this.data, function(record){
			return record[pk] == id;
		}) ;
	}

	if (_DEBUG) console.log('inserting item %s into model %s of dataspace %s, after insertion, _index == %s',
		util.inspect(item), this.name, this.get_config('dataspace').component_id, util.inspect(this._index));

	this.data.push(item);

	//console.log('indexing record %s = %s', pk, item[pk]);
	this.index_record(item);
	if (cb) cb(null, item);
	this.emit('record', item);

	return item;
}