import { Model } from "mongoose";
import { AllDocuments } from '../types';

const migration = async (model : Model<AllDocuments>, column : string, defaultValue : any) => {
    const noColums : AllDocuments[] = await model.find().exists(column, false);

    noColums.forEach(doc => {
        doc[column] = defaultValue;
        model.collection.updateMany({ _id : doc.id }, doc);
    });
};

export default migration;
