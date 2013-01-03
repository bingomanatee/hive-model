var schema_static_mixins = require('./schema_statics_mixins');

/**
 *
 * @param model Object | Mongoose.Model | Mongoose.Schema
 * @param mongoose - the Mongoose module
 * @param mongoose_model the MongooseModel root object
 *

 module.exports = function (model, mongoose, mongoose_model) {

    if (model instanceof mongoose.Model) {
        mongoose_model.model = model;
    } else {
        //      console.log(' >>>>> processing raw object %s', util.inspect(model));
        if (!mongoose_model.name) {
            throw new Error("Dynamic models MUST have names!");
        }
        var schema;
        if ((model instanceof mongoose.Schema)) {
            schema = model;
        } else {
            //        console.log('making schema')
            schema = new mongoose.Schema(model);
        }

        try {

            schema.statics.active = function (callback) {
                var q = {'$nor':[
                    {deleted:true}
                ]};
                return callback ? mongoose_model.find(q).exec(callback) : mongoose_model.find(q);
            }

            schema.statics.active_count = function (callback) {
                var q = {'$nor':[
                    {deleted:true}
                ]};
                return callback ? mongoose_model.find(q).count(callback) : mongoose_model.find(q).count();
            }

            schema.statics.inactive = function (callback) {
                return callback ? mongoose_model.find('deleted', true).exec(callback) : mongoose_model.find('deleted', true)
            }

            mongoose_model.model = mongoose.model(mongoose_model.name, schema);
        } catch (e) {
            console.log('error in mongoose modelling: %s', e.getMessage());
            throw e;
        }
    }

} */

model.exports = function (callback) {
	var mongoose = this.get_config('mongoose');
	if (this.has_config('schema')) {
		var schema_def = this.get_config('schema');
		if (_.isString(schema)) {
			schema_def = require('schemaa');
		}
		var schema;
		if (schema_def instanceof mongoose.Schema) {
			schema = schema_def;
		} else {
			schema = new mongoose.Schema(schema_def);
		}

		_.extend(schema.statics, schema_static_mixins);

		this.model = mongoose.model(mongoose_model.name, schema);
		callback();
	}
};