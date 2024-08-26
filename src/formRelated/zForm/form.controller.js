import Form from "./form.model.js";

export const submitForm = async (req, res) => {
    try {
        const { responses, userId } = req.body;

        const newForm = new Form({
            responses,
            userId
        });

        await newForm.save();

        // Calculate the total score and percentage
        let totalScore = 0;
        let maxScore = 0;

        responses.forEach(response => {
            totalScore += response.selectedOption.value;
            maxScore += 6; // Assuming max value per question is 5
        });

        const percentage = (totalScore / maxScore) * 100;

        let result;
        if (percentage >= 80) {
            result = "Terrible";
        } else if (percentage >= 60) {
            result = "Poor";
        } else if (percentage >= 40) {
            result = "Average";
        } else if (percentage >= 20) {
            result = "Good";
        } else {
            result = "Excelent";
        }

        res.status(200).json({ result, percentage });
    } catch (error) {
        res.status(500).json({ msg: 'Error submitting form', error: error.message });
    }
};