import { Checkbox } from "@/components/ui/checkbox";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
const ProductHot = ({form}:any) => {
  return (
    <>
      <FormField
                        control={form.control}
                        name="featured"
                        render={({ field }) => (
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-0 leading-none">
                                    <FormLabel>Sản phẩm nổi bật?</FormLabel>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
    </>
  )
}

export default ProductHot
