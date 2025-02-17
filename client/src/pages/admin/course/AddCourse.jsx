import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCreateCourseMutation } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("")
  const [category, setCategory] = useState("")

  const [createCourse,{data,error,isSuccess,isLoading}] = useCreateCourseMutation()

  const navigate = useNavigate()

  const getSelectedCategory = (value) => {
    setCategory(value)
  }

  

  const createCourseHandler = async() => {
    await createCourse({courseTitle, category})
  }
  useEffect(()=>{
    if(isSuccess){
      toast.success(data.message || "course created")
    }
  },[isSuccess,error])
  

  return (
    <div className="flex-1 mx-10">
    <div className='mb-5'>
    <h1 className="font-bold text-xl"> Lets add course, add some basic course details for your new course</h1>
    <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
          laborum!
        </p>

    </div>
    <div className="space-y-5">
      <div >
    <Label>Title</Label>
    <Input type="text" name="courseTitle" value={courseTitle} onChange={(e)=>setCourseTitle(e.target.value)} placeholder = "Your Course Name"/>
      </div>
      <div >
    <Label>Category</Label>
    <Select onValueChange={getSelectedCategory}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Category</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" onClick={()=>navigate("/admin/course")}>Back</Button>
        <Button disabled={isLoading} onClick={createCourseHandler}>{
          isLoading ? (
            <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
            Please wait
            </>
          ) : "Create"
          
          }</Button>

      </div>
    </div>
        
    </div>
  )
}

export default AddCourse