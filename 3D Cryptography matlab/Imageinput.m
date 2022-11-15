clc;
clear all;
close all;
x2=imread('punisher.png');
z2=1;
[m n]=size(x2);
for i=1:1:m
for j=1:1:n
a=dec2bin(x2(i,j),8);
b=a(z2);
y2(i,j)=double(b);
if y2(i,j) == 415
y2(i,j) = 255;
else y2(i,j) = 0;
end;
end;
end;
z1=y2;
%matrix declaration
% m=1;
% for i=1:15
%     for j=1:15
%         for k=1:15           
%           
%             x1(i,j,k)=0;
%             encmtrx(i,j,k)=0;
%             ogmtrx(i,j,k)=0;
%              b(m)=0;
%              a(m)=0;
%         end;
%       
%     end;
% end;

%part 1
k=1;
m=1;
for i=1:15
  
    for j=1:15
        x1(i,j,k)=z1(i,j);
    end;
k=k+1;
end;

for i=1:15
    for j=1:15
        for k=1:15          
          
            b(m)=x1(i,j,k);
            m=m+1;
        end;
    end;
end;

%generate ds
a = randperm(3375,3375);

%generate address ds matrix
m=1;
for i=1:15
    for j=1:15
        for k=1:15           
            x(i,j,k)=a(m);
           
            m=m+1;
        end;
    end;
end;

%encryption
for i=1:15
    for j=1:15
        for k=1:15
            %storing address encryption ds in m
            m=x(i,j,k);
           
            encmtrx(i,j,k)=b(m);
           
        end;
    end;
end;

%decryption
for i=1:15
    for j=1:15
        for k=1:15           
            m=x(i,j,k);
            c(m)=encmtrx(i,j,k);
           
        end;
    end;
end;

%resultant array c must match original string b
%putting resultant array in cube
%resultant cube ogmtrx must match x1 original matrix
m=1;
for i=1:15
    for j=1:15
        for k=1:15  
