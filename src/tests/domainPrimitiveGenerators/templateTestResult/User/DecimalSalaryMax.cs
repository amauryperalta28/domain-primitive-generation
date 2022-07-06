using Wepsys.Core;

namespace RI.Novus.Core.Users;

/// <summary>
/// Represents User's DecimalSalaryMax
/// </summary>
public sealed class DecimalSalaryMax : ICoreDomainPrimitive<decimal>
{
	/// <summary>
	/// As primitive types are inlined by the compiler the coverlet tool does not catch a hit for 
	/// lines `private const decimal MinValue = 0.01M; and MaxValue.
	/// </summary>
	#pragma warning disable CA1802 //Field 'xxx' is 'readonly' but initialized with constant value. Use 'const' instead.
	private static readonly decimal MinValue = 0.01M;

	private static readonly decimal MaxValue = 40M;

	#pragma warning restore CA1802 //Field 'xxx' is 'readonly' but initialized with constant value. Use 'const' instead.

	/// <summary>
	/// Shortcut for constructor <see cref="DecimalSalaryMax"/>.
	/// <param name="decimalSalaryMax">Represents a decimalSalaryMax.</param>
	/// <returns>An instance of <see cref="DecimalSalaryMax"/></returns>
	/// </summary>
	public static DecimalSalaryMax From(string decimalSalaryMax) => new(decimalSalaryMax);

	private DecimalSalaryMax(decimal rawDecimalSalaryMax)
	  => Value = Arguments.Between(rawDecimalSalaryMax, MinValue, MaxValue, nameof(rawDecimalSalaryMax), "Invalid value or format for User's DecimalSalaryMax");

	/// <summary>
	/// Gets property value
	/// </summary>
	public decimal Value { get; }

}
