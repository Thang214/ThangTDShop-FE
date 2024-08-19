import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const DescriptionForm = ({form}:any) => {
  return (
    <>
      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel htmlFor="description">
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} id="description" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
    </>
  )
}

export default DescriptionForm
