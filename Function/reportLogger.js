const fs = require("fs");
const path = require("path");

class ReportLogger {
    constructor(testCaseID, inputData) {
        this.testCaseID = testCaseID;
        this.inputData = inputData;
        this.steps = [];
        this.isBlocked = false;

        this.reportDirectory = "../Report";

        if (!fs.existsSync(this.reportDirectory)) {
            fs.mkdirSync(this.reportDirectory, { recursive: true });
        }

        this.reportPath = path.join(this.reportDirectory, `report_${this.testCaseID}.txt`);
        // Xóa file cũ nếu tồn tại
        if (fs.existsSync(this.reportPath)) {
            fs.unlinkSync(this.reportPath);
        }
    }

    logStep(stepDescription, success) {
        let status;
        if (this.isBlocked) {
            status = "Blocked";
        } else if (success) {
            status = "Succeed";
        } else {
            status = "Failed";
            this.isBlocked = true;
        }

        console.log(`${stepDescription}: ${status}`);
        this.steps.push({ stepDescription, status });
    }

    logIteration(iterationData) {
        let result = this.steps.some(step => step.status === "Failed") ? "Thất bại" : "Thành công";

        let reportContent = `========================\n`;
        reportContent += `Testcase: ${this.testCaseID}\n`;
        reportContent += `Dữ liệu: ${JSON.stringify(iterationData, null, 2)}\n`;
        reportContent += `Thứ tự các bước:\n`;

        this.steps.forEach((step, index) => {
            reportContent += `- Bước ${index + 1}: ${step.status}\n`;
        });

        reportContent += `Tổng kết: ${result}\n`;
        reportContent += `========================\n`;

        fs.appendFileSync(this.reportPath, reportContent, "utf8");
        console.log(`Báo cáo iteration đã được ghi tại: ${this.reportPath}`);

        // Reset steps và isBlocked cho iteration tiếp theo
        this.steps = [];
        this.isBlocked = false;
    }

    generateReport() {
        if (this.steps.length > 0) {
            let result = this.steps.some(step => step.status === "Failed") ? "Thất bại" : "Thành công";

            let reportContent = `========================\n`;
            reportContent += `Testcase: ${this.testCaseID}\n`;
            reportContent += `Dữ liệu: ${JSON.stringify(this.inputData, null, 2)}\n`;
            reportContent += `Thứ tự các bước:\n`;

            this.steps.forEach((step, index) => {
                reportContent += `- Bước ${index + 1}: ${step.status}\n`;
            });

            reportContent += `Tổng kết: ${result}\n`;
            reportContent += `========================\n`;

            fs.writeFileSync(this.reportPath, reportContent, "utf8");
            console.log(`Báo cáo đã được lưu tại: ${this.reportPath}`);
        }
    }
}

module.exports = ReportLogger;