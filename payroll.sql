CREATE TABLE payroll (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_name VARCHAR(100) NOT NULL,
    hours_worked DECIMAL(5,2) NOT NULL,
    hourly_wage DECIMAL(10,2) NOT NULL,
    total_pay DECIMAL(10,2) NOT NULL,
    payroll_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger to automatically calculate total_pay
DELIMITER //
CREATE TRIGGER calculate_total_pay BEFORE INSERT ON payroll
FOR EACH ROW
BEGIN
    SET NEW.total_pay = NEW.hours_worked * NEW.hourly_wage;
END //
DELIMITER ;
