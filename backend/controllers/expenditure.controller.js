// expenditureController.js

import Expenditure from '../models/expenditure.model.js';

// Create a new expenditure
export const createExpenditure = async (req, res) => {
    const { classExp, subclasses } = req.body;

    try {
        const expenditure = new Expenditure({ classExp, subclasses });
        await expenditure.save();
        res.status(201).json(expenditure);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all expenditures
export const getAllExpenditure = async (req, res) => {
    try {
        const expenditures = await Expenditure.find();
        res.status(200).json(expenditures);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get an expenditure by ID
export const getExpenditureById = async (req, res) => {
    try {
        const expenditure = await Expenditure.findById(req.params.id);
        if (expenditure) {
            res.status(200).json(expenditure);
        } else {
            res.status(404).json({ message: 'Expenditure not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an expenditure by ID
export const updateExpenditureById = async (req, res) => {
    try {
        const expenditure = await Expenditure.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (expenditure) {
            res.status(200).json(expenditure);
        } else {
            res.status(404).json({ message: 'Expenditure not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete an expenditure by ID
export const deleteExpenditureById = async (req, res) => {
    try {
        const expenditure = await Expenditure.findByIdAndDelete(req.params.id);
        if (expenditure) {
            res.status(200).json({ message: 'Expenditure deleted' });
        } else {
            res.status(404).json({ message: 'Expenditure not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get subclasses by classExp
export const getSubclassesByClass = async (req, res) => {
    try {
        const expenditures = await Expenditure.find({ classExp: req.params.classExp });
        if (expenditures.length > 0) {
            const subclasses = expenditures.map(exp => exp.subclasses).flat();
            res.status(200).json(subclasses);
        } else {
            res.status(404).json({ message: 'Expenditures with specified class not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific expenditure by classExp and subclass name
export const getExpenditureByClassAndSubclass = async (req, res) => {
    try {
        const classExp = parseInt(req.params.classExp, 10); // Ensure classExp is a number
        const subclassName = req.params.subclass;

        // Find an expenditure with the specified classExp and subclass name
        const expenditure = await Expenditure.findOne({
            classExp: classExp,
            'subclasses.name': subclassName
        });

        if (expenditure) {
            // Find the specific subclass within the matched expenditure
            const matchedSubclass = expenditure.subclasses.find(sub => sub.name === subclassName);
            if (matchedSubclass) {
                res.status(200).json({
                    classExp: expenditure.classExp,
                    subclass: matchedSubclass
                });
            } else {
                res.status(404).json({ message: 'Subclass not found in the specified classExp' });
            }
        } else {
            res.status(404).json({ message: 'Expenditure with specified classExp not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search expenditures based on query parameters
export const searchExpenditure = async (req, res) => {
    try {
        const query = req.body; // Expecting query parameters in the request body

        // Build query object dynamically based on request body
        const searchQuery = {};
        if (query.classExp) searchQuery.classExp = query.classExp;
        if (query.subclasses && query.subclasses.length > 0) {
            searchQuery['subclasses.name'] = { $in: query.subclasses };
        }

        // Perform the search
        const expenditures = await Expenditure.find(searchQuery);

        res.status(200).json(expenditures);
    } catch (error) {
        console.log("searchExpenditure Controller Error", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

