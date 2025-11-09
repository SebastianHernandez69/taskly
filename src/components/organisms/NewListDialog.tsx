"use client";

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { GradientColor, gradientColors } from '@/styles/gradients';
import { Label } from '../ui/label';

// TODO: move to types file
interface Color {
  $id: string;
  class: GradientColor;
}

interface NewListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateAction: (formData: FormData) => Promise<{ success: boolean; message?: string }>;
  colors: Color[];
}

// Schema de validación
const listSchema = yup.object({
  name: yup
    .string()
    .required('List name is required')
    .min(3, 'List name must be at least 3 characters')
    .max(50, 'List name must be less than 50 characters'),
  description: yup
    .string()
    .max(200, 'Description must be less than 200 characters')
    .default(''),
  colorId: yup
    .string()
    .required('Please select a color'),
});

type ListFormData = yup.InferType<typeof listSchema>;

export const NewListDialog: React.FC<NewListDialogProps> = ({
  open,
  onOpenChange,
  onCreateAction,
  colors,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ListFormData>({
    resolver: yupResolver(listSchema),
    defaultValues: {
      name: '',
      description: '',
      colorId: '',
    },
  });

  const selectedColorId = watch('colorId');

  // Seleccionar el primer color por defecto cuando se abra el dialog
  useEffect(() => {
    if (open && colors.length > 0 && !selectedColorId) {
      setValue('colorId', colors[0].$id);
    }
  }, [open, colors, selectedColorId, setValue]);

  // Reset form cuando se cierre el dialog
  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (data: ListFormData) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description || '');
    formData.append('colorId', data.colorId);

    // Cerrar dialog y resetear ANTES de hacer la petición
    onOpenChange(false);
    reset();

    try {
      const result = await onCreateAction(formData);
      
      if (result && !result.success) {
        toast.error(result.message || 'Failed to create list');
      } else {
        toast.success('List created successfully!');
      }
    } catch (error) {
      toast.error('Something went wrong');
      console.error('Error creating list:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new list</DialogTitle>
          <DialogDescription>
            Give your list a name, choose a color, and add an optional description.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* Name Input */}
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-2">
                List name
              </Label>
              <Input
                {...register('name')}
                placeholder="List name..."
                className="w-full"
                autoFocus
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Color Selector */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-slate-700 ">
                Choose a color
              </Label>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((color) => (
                  <button
                    key={color.$id}
                    type="button"
                    onClick={() => setValue('colorId', color.$id)}
                    disabled={isSubmitting}
                    className={`
                      relative h-12 rounded-lg bg-gradient-to-r ${gradientColors[color.class]}
                      transition-all duration-200 hover:scale-105 hover:shadow-lg
                      disabled:opacity-50 disabled:cursor-not-allowed
                      ${selectedColorId === color.$id ? 'ring-2 ring-slate-800 ring-offset-2' : ''}
                    `}
                    
                  >
                    {selectedColorId === color.$id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className="w-6 h-6 text-white drop-shadow-lg" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              {errors.colorId && (
                <p className="text-red-500 text-sm mt-1">{errors.colorId.message}</p>
              )}
            </div>

            {/* Description Textarea */}
            <div>
              <Label className="text-sm font-medium text-slate-700 mb-2">
                List description
              </Label>
              <Textarea
                {...register('description')}
                placeholder="List description... (optional)"
                className="w-full"
                disabled={isSubmitting}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isSubmitting}>
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white"
            >
              {isSubmitting ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}