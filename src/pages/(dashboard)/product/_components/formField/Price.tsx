import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const PriceForm = ({form}:any) => {
    return (
        <>
            <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel htmlFor="price">Giá</FormLabel>
                        <FormControl>
                            <Input {...field} id="price" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            ></FormField>
        </>
    );
};

export default PriceForm;
