import { Student, Students } from 'types/students.type'
import http from 'utils/http'
// Tạo các hàm dể call api
// lấy danh sách student
export const getStudents = (page: number | string, limit: number | string) => {
  return http.get<Students>('students', {
    params: {
      _page: page,
      _limit: limit
    }
  })
}

// tạo thêm student
// OHàm Omit là một phương thức trong TypeScript được sử dụng để tạo một kiểu mới bằng cách loại bỏ một số thuộc tính cụ thể từ kiểu dữ liệu gốc.
export const addStudent = (student: Omit<Student, 'id'>) => {
  return http.post<Student>('/students', student)
}