const fs = require("fs");
const path = require("path");

class ReportLogger {
    constructor(testCaseID, inputData) {
        this.testCaseID = testCaseID;
        this.inputData = inputData;
        this.steps = [];
        this.isBlocked = false; // Cờ để block bước tiếp theo nếu có lỗi

        // Đường dẫn thư mục lưu report
        this.reportDirectory = "../Report";

        // Tạo thư mục nếu chưa tồn tại
        if (!fs.existsSync(this.reportDirectory)) {
            fs.mkdirSync(this.reportDirectory, { recursive: true });
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
            this.isBlocked = true; // Block các bước sau nếu có lỗi
        }

        console.log(`${stepDescription}: ${status}`);
        this.steps.push({ stepDescription, status });
    }

    generateReport() {
        let reportPath = path.join(this.reportDirectory, `report_${this.testCaseID}.txt`);
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

        fs.writeFileSync(reportPath, reportContent, "utf8");
        console.log(`📄 Báo cáo đã được lưu tại: ${reportPath}`);
    }
}

module.exports = ReportLogger;
